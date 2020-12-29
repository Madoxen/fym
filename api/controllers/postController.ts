import { Request, Response } from "express";
import { ObjectID, ReplSetOptions } from "mongodb";
import { Post, IPost } from "../models/post";
import UserDetails from "../models/userDetails";





class PostController {



    createPost = (req: Request, res: Response) => {

        if (req.body.title === undefined)
            return res.status(400).send({ error: "title field missing in request body" });
        if (req.body.content === undefined)
            return res.status(400).send({ error: "content field missing in request body" });
        if (req.body.tags === undefined)
            return res.status(400).send({ error: "tags field missing in request body" });

        //verify if body is of IPost type
        let p = new Post();
        p.content = req.body.content;
        p.title = req.body.title;
        p.tags = req.body.tags;
        try {
            Post.insert(req.params.username, p);
        }
        catch
        {
            return res.status(500).send({ error: "Could not insert a new document" })
        }

        return res.status(200).send(p);
    }

    deletePost = (req: Request, res: Response) => {

        try {
            Post.remove(req.params.username, new ObjectID(req.params.postid));
        }
        catch
        {
            return res.status(500).send({ error: "Could not remove a document" })
        }
        return res.status(200).send();
    }

    updatePost = (req: Request, res: Response) => {
        if (req.body.title === undefined)
            return res.status(400).send({ error: "title field missing in request body" });
        if (req.body.content === undefined)
            return res.status(400).send({ error: "content field missing in request body" });
        if (req.body.tags === undefined)
            return res.status(400).send({ error: "tags field missing in request body" });



        let p: IPost =
        {
            content: req.body.content,
            title: req.body.title,
            tags: req.body.tags,
        }

        try {
            Post.update(p, new ObjectID(req.params.postid), req.params.username);
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

    getPostsForUser = async (req: Request, res: Response) => {
        let details = await UserDetails.getUserDetails(req.params.username);
        return res.status(200).json(details?.posts);
    }


}


export default PostController