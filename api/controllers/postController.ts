import { strict } from "assert";
import { Request, Response } from "express";
import db from "../db";
import { Post, IPost } from "../models/post";
import UserAccount from "../models/userAccount";


interface IFindPostsQuery {
    tags?: [];
    author?: string;
}


class PostController {

    createPost = async (req: Request<{ username: string }, IPost>, res: Response) => {
        try {
            let id = await UserAccount.getAccFromUsername(req.params.username).then(x => x?.id);
            if (id === undefined)
                return res.status(404).send({ error: "username not found" })

            await Post.insert(id, req.body);
        }
        catch
        {
            return res.status(500).send({ error: "Could not insert a new document" })
        }
        return res.status(200).send();
    }

    deletePost = async (req: Request<{ postid: number }>, res: Response) => {

        try {
            await Post.remove(req.params.postid);
        }
        catch
        {
            return res.status(500).send({ error: "Could not remove a document" })
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
            return res.status(500).send({ error: "Could not insert a new document" })
        }
        return res.status(200).send();
    }

    findPosts = async (req: Request<{}, {}, {}, IFindPostsQuery>, res: Response) => {
        let result = await db.query("SELECT * FROM tagsposts WHERE tagid = ANY ($1)", [req.query.tags]).then(res => res.rows);
        res.status(200).json(result);
    }

    getPostsForUser = async (req: Request<{ username: string }>, res: Response) => {
        let acc = await (await db.query("SELECT * FROM auth WHERE username=$1", [req.params.username])).rows[0]
        let posts = (await db.query("SELECT * FROM posts WHERE userid=$1", [acc.id])).rows
        return res.status(200).json(posts);
    }
}


export default PostController