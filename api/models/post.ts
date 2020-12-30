import { start } from "repl";
import db from "../db";
import getDb from "../db";
import UserDetails, { IUserDetails } from "./userDetails";


export interface IPost {
    readonly id?: number
    content: string;
    title: string;
}

export class Post implements IPost {

    readonly id: number;
    content: string = "";
    title: string = "";

    //We need to provide associated username for Post
    constructor() {
        this.id = 0;
    }

    static async insert(userID: number, p: IPost): Promise<Post | null> {
        console.log(p)
        return db.query("INSERT INTO posts(userid, content, title) VALUES ($1, $2, $3) RETURNING *",
            [userID, p.content, p.title])
            .then(res => res.rows[0])
            .catch(null)
    }

    static async update(p: Post): Promise<Post | null> {
        return db.query("UPDATE posts SET content=$1, title=$2 WHERE id = $3 RETURNING *", [p.content, p.title, p.id])
            .then(res => res.rows[0])
            .catch(null)
    }

    static async remove(postID: number) {
        db.query("DELETE FROM posts WHERE postID = $1", [postID]).catch(null);
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