import { strict } from "assert";
import { Request, Response } from "express";
import db from "../db";
import { Post, IPost } from "../models/post";
import UserAccount from "../models/userAccount";


class PostController {

    createPost = async (req: Request<{ username: string }, IPost>, res: Response) => {
        try {
            let id = await UserAccount.getAccFromUsername(req.params.username).then(x => x?.id);
            if (id === undefined)
                return res.status(404).send({ error: "username not found" })
            
            Post.insert(id, req.body);
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

    updatePost = (req: Request<{}, IPost>, res: Response) => {
        try {
            Post.update(req.body);
        }
        catch
        {
            return res.status(500).send({ error: "Could not insert a new document" })
        }
        return res.status(200).send();
    }

    findPosts = (req: Request, res: Response) => {

    }

    getPost = (req: Request, res: Response) => {

    }


    getPostsForUser = async (req: Request<{ username: string }>, res: Response) => {
        let acc = await (await db.query("SELECT * FROM auth WHERE username=$1", [req.params.username])).rows[0]
        let posts = (await db.query("SELECT * FROM posts WHERE userid=$1", [acc.id])).rows
        return res.status(200).json(posts);
    }


}


export default PostController