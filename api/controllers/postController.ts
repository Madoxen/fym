import { strict } from "assert";
import { query, Request, Response } from "express";
import db from "../db";
import { Post, IPost } from "../models/post";
import UserAccount from "../models/userAccount";


interface IFindPostsQuery {
    tagids?: [];
    start?: number;
    limit?: number;
    author?: string;
}

export interface IPostPOST {
    content: string,
    title: string,
    tagids: number[]
}

class PostController {

    private tags: { tagid: number, name: string }[] | undefined = undefined;

    getTags = async (): Promise<{ tagid: number, name: string }[]> => {
        if (this.tags === undefined) {
            this.tags = await db.query("SELECT * FROM tags", []).then(x => x.rows);
            return this.tags as any;
        }
        return this.tags;
    }

    createPost = async (req: Request<{ username: string }, IPost>, res: Response) => {
        try {
            let id = await UserAccount.getAccFromUsername(req.params.username).then(x => x?.id);
            if (id === undefined)
                return res.status(404).send("username not found")


            return res.status(200).json(await Post.insert(id, req.body));
        }
        catch
        {
            return res.status(500).send("Could not insert a new document")
        }

    }

    deletePost = async (req: Request<{ postid: number }>, res: Response) => {
        try {
            await Post.remove(req.params.postid);
        }
        catch
        {
            return res.status(500).send("Could not remove a post")
        }
        return res.status(200).send();
    }

    updatePost = async (req: Request<{ username: string, postid: number }, IPost>, res: Response) => {
        try {
            let p: IPost = { id: req.params.postid, content: req.body.content, title: req.body.title, tagIDs: req.body.tagIDs };
            await Post.update(p);
        }
        catch
        {
            return res.status(500).send("Could not insert a new post")
        }
        return res.status(200).send();
    }

    findPosts = async (req: Request<{}, {}, {}, IFindPostsQuery>, res: Response) => {

        let queryTags: string | string[] = req.query.tagids as string | [];

        if (typeof (req.query.tagids) === "string")
            queryTags = [req.query.tagids];


        if (req.query.tagids === undefined)
            req.query.tagids = [];

        if (req.query.limit === undefined)
            req.query.limit = 10;

        if (req.query.start === undefined)
            req.query.start = 0;

        try {
            //TODO: OFFSET AND LIMIT
            let result = await db.query(`SELECT * FROM (SELECT posts.postid, array_agg(tagsposts.tagid) tagIDs, posts.content, posts.title, auth.username FROM tagsposts
            RIGHT JOIN posts ON posts.postid = tagsposts.postid
            INNER JOIN userDetails ON userDetails.userid = posts.userid
            INNER JOIN auth ON auth.id = userDetails.accountid
            GROUP BY posts.postid, posts.content, posts.title, auth.username) a 
            WHERE a.tagIDs && $1 OR (array_length($1, 1) IS NULL AND a.tagIDs[0] IS NULL)
            LIMIT $2 OFFSET $3`, [queryTags, req.query.limit, req.query.start]).then(res => res.rows);
            return res.status(200).json(result);
        }
        catch (e) {
            return res.status(500).send(e);
        }

    }

    getPostsForUser = async (req: Request<{ username: string }>, res: Response) => {
        try {
            let result = await db.query(`SELECT posts.postid, array_agg(tagsposts.tagid) tagIDs, posts.content, posts.title, auth.username FROM tagsposts
            RIGHT JOIN posts ON posts.postid = tagsposts.postid
            INNER JOIN userDetails ON userDetails.userid = posts.userid
            INNER JOIN auth ON auth.id = userDetails.accountid
            WHERE auth.username = $1 GROUP BY posts.postid, posts.content, posts.title, auth.username;`, [req.params.username]).then(res => res.rows);
            return res.status(200).json(result);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }
}


export default PostController