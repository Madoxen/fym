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

        if (req.body.content === undefined)
            return res.status(400).send("content field not found");
        if (req.body.title === undefined)
            return res.status(400).send("title field not found");
        if (req.body.tagIDs === undefined)
            return res.status(400).send("tagIDs field not found");

        if (typeof(req.body.content) !== "string")
            return res.status(400).send("content not a string");
        if (typeof(req.body.title) !== "string")
            return res.status(400).send("title not a string");
        if (typeof(req.body.tagIDs) !== "object")
            return res.status(400).send("tagIDs not of object type");



        try {
            let id = await UserAccount.getAccFromUsername(req.params.username).then(x => x?.id);
            if (id === undefined)
                return res.status(404).send("username not found" )


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
            return res.status(500).send("Could not remove a document")
        }
        return res.status(200).send();
    }

    updatePost = async (req: Request<{ username: string, postid: number }, IPost>, res: Response) => {

        if (req.params.postid === undefined)
            return res.status(400).send("postid parameter not found");
        if (req.body.content === undefined)
            return res.status(400).send("content field not found");
        if (req.body.title === undefined)
            return res.status(400).send("title field not found");
        if (req.body.tagIDs === undefined)
            return res.status(400).send("tagIDs field not found");

        if (typeof(req.body.content) !== "string")
            return res.status(400).send("content not a string");
        if (typeof(req.body.title) !== "string")
            return res.status(400).send("title not a string");
        if (typeof(req.body.tagIDs) !== "object")
            return res.status(400).send("tagIDs not of object type");



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

        let queryTags: string | string[] = req.query.tags as string | [];

        if (typeof (req.query.tags) === "string")
            queryTags = [req.query.tags];

        try {
            //TODO: OFFSET AND LIMIT
            let tagsposts = await db.query("SELECT * FROM tagsposts WHERE postid = ANY(SELECT DISTINCT postid FROM tagsposts WHERE tagid = ANY ($1));", [queryTags]).then(res => res.rows);
            //get all unique post ids 
            let postIds: { postid: number, tagIds: number[] }[] = [];
            tagsposts.forEach(x => {
                let p = postIds.find(y => y.postid === x.postid)
                if (p === undefined) {
                    postIds.push({ postid: x.postid, tagIds: [x.tagid] });
                }
                else {
                    p.tagIds.push(x.tagid);
                }
            })

            //Now query for post information
            let tasks: Promise<any>[] = [];
            postIds.forEach(postTag => {
                tasks.push(db.query("SELECT * FROM posts WHERE postid=$1", [postTag.postid]).then(r => r.rows[0]));
            });

            let result = await Promise.all(tasks)

            result = result.map(post => ({ ...post, tagids: postIds.find(y => y.postid === post.postid)?.tagIds }));

            return res.status(200).json(result);
        }
        catch (e) {
            return res.status(500).send(e);
        }

    }

    getPostsForUser = async (req: Request<{ username: string }>, res: Response) => {
        try {
            let acc = await (await db.query("SELECT * FROM auth WHERE username=$1", [req.params.username])).rows[0]
            let posts = (await db.query("SELECT * FROM posts WHERE userid=$1", [acc.id])).rows
            //Add tags to related posts
            let tagsposts = await db.query("SELECT * FROM tagsposts WHERE postid = ANY($1)", [posts.map(x => x.postid)]).then(r => r.rows);
            let postIds: { postid: number, tagIds: number[] }[] = [];
            tagsposts.forEach(x => {
                let p = postIds.find(y => y.postid === x.postid)
                if (p === undefined) {
                    postIds.push({ postid: x.postid, tagIds: [x.tagid] });
                }
                else {
                    p.tagIds.push(x.tagid);
                }
            })

            let result = posts.map(p => ({ ...p, tagsIds: postIds.find(q => q.postid === p.postid)?.tagIds }))

            return res.status(200).json(result);
        }
        catch (e) {
            return res.status(500).send(e);
        }
    }
}


export default PostController