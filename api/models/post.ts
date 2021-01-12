import { start } from "repl";
import db from "../db";
import getDb from "../db";
import UserDetails, { IUserDetails } from "./userDetails";


export interface IPost {
    readonly id?: number
    content: string;
    title: string;
    tagids: number[];
}

export class Post implements IPost {

    readonly id: number;
    content: string = "";
    title: string = "";
    tagids: number[] = [];

    //We need to provide associated username for Post
    constructor(id: number) {
        this.id = id
    }

    static async insert(userID: number, p: IPost): Promise<Post> {
        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await db.pool.connect()
        try {
            await client.query('BEGIN')
            //Insert new post
            const postID: number = await client.query("INSERT INTO posts(userid, content, title) VALUES ($1, $2, $3) RETURNING postid",
                [userID, p.content, p.title]).then(r => r.rows[0].postid);
            //Insert post tags
            const tagInsertTasks: Promise<any>[] = []
            p.tagids.forEach(tagID => {
                tagInsertTasks.push(client.query("INSERT INTO tagsposts(postid, tagid) VALUES ($1,$2)", [postID, tagID]))
            });
            await Promise.all(tagInsertTasks);
            await client.query('COMMIT')
            let result: Post = new Post(postID);
            result.content = p.content;
            result.tagids = p.tagids;
            result.title = p.title
            return result;
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    }

    static async update(p: IPost): Promise<Post | null> {

        if (p.id === undefined)
            return null;

        const client = await db.pool.connect();
        try {
            await client.query('BEGIN')
            //Insert new post
            await client.query("UPDATE posts SET content=$1, title=$2 WHERE postid = $3 RETURNING *",
                [p.content, p.title, p.id]);
            //Delete all post tags
            await client.query("DELETE FROM tagsposts WHERE postid=$1", [p.id])
            //Insert post tags
            console.log(p.tagids)
            const tagInsertTasks: Promise<any>[] = []
            p.tagids.forEach(tagID => {
                tagInsertTasks.push(client.query("INSERT INTO tagsposts(postid, tagid) VALUES ($1,$2)", [p.id, tagID]))
            });
            await Promise.all(tagInsertTasks);
            await client.query('COMMIT')
            let result: Post = new Post(p.id);
            result.content = p.content;
            result.tagids = p.tagids.filter(x => x != undefined && x != null);
            result.title = p.title
            return result;
        } catch (e) {
            await client.query('ROLLBACK')
            console.log(e);
            throw e
        } finally {
            client.release()
        }
    }

    static async remove(postID: number) {
        db.query("DELETE FROM posts WHERE postID = $1", [postID])
    }


    static getPost = async (postID: number): Promise<Post> => {
        return db.query("SELECT * FROM posts WHERE postID = $1", [postID])
            .then(res => res.rows[0])
            .catch(null)
    }

    static getPostRange = async (startingIndex: number = 0, limit: number = 10): Promise<Post[]> => {
        return db.query("SELECT * FROM posts LIMIT $2 OFFSET $1", [startingIndex, limit])
            .then(res => res.rows)
            .catch(null);
    }
}

export default Post;