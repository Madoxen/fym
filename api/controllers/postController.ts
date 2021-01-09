import { strict } from "assert";
import { query, Request, Response } from "express";
import db from "../db";
import { Post, IPost } from "../models/post";
import UserAccount from "../models/userAccount";


interface IFindPostsQuery {
    tags?: [];
    author?: string;
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

        let queryTags: string | string[] = req.query.tags as string | [];

        if (typeof (req.query.tags) === "string")
            queryTags = [req.query.tags];

        try {
            //TODO: OFFSET AND LIMIT
            let result = await db.query(`SELECT tagsposts.postid, array_agg(tagsposts.tagid) tagIDs, posts.content, posts.title, auth.username FROM tagsposts
            INNER JOIN posts ON posts.postid = tagsposts.postid
            INNER JOIN userDetails ON userDetails.userid = posts.userid
            INNER JOIN auth ON auth.id = userDetails.accountid
            WHERE tagsposts.postid = ANY(SELECT DISTINCT postid FROM tagsposts WHERE tagid = ANY ($1)) GROUP BY tagsposts.postid, posts.content, posts.title, auth.username;`, [queryTags]).then(res => res.rows);

            return res.status(200).json(result);
        }
        catch (e) {
            return res.status(500).send(e);
        }

    }

    getPostsForUser = async (req: Request<{ username: string }>, res: Response) => {
        try {
            let result = await db.query(`SELECT tagsposts.postid, array_agg(tagsposts.tagid) tagIDs, posts.content, posts.title, auth.username FROM tagsposts
            INNER JOIN posts ON posts.postid = tagsposts.postid
            INNER JOIN userDetails ON userDetails.userid = posts.userid
            INNER JOIN auth ON auth.id = userDetails.accountid
            WHERE auth.username = $1 GROUP BY tagsposts.postid, posts.content, posts.title, auth.username;`, [req.params.username]).then(res => res.rows);

            return res.status(200).json(result);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }
}


export default PostController