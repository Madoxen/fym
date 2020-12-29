import { Collection, Cursor, ObjectID, ObjectId } from "mongodb";
import { start } from "repl";
import getDb from "../db";
import UserDetails from "./userDetails";




export interface IPost {
    content: string;
    title: string;
    tags: string[];
}

export class Post implements IPost {

    readonly _id: ObjectId;
    content: string = "";
    title: string = "";
    tags: string[] = [];

    //We need to provide associated username for Post
    constructor() {
        this._id = new ObjectID();
    }

    private static userDetailsCollection: Collection<UserDetails>;


    static async insert(user: string, p: Post) {
        await Post.getCollection().then(collection => collection.updateOne({ username: user }, { $push: { posts: p } }));
    }


    static async update(p: IPost, id: ObjectID, user: string) {
        (await Post.getCollection()).updateOne({ username: user }, { $set: p })
    }


    static async remove(user: string, id: ObjectId) {
        (await Post.getCollection()).updateOne({ username: user }, { $pull: { posts: { _id: id } } }) //remove from embedded array
    }

    static async getCollection(): Promise<Collection<UserDetails>> {
        if (Post.userDetailsCollection === undefined)
            Post.userDetailsCollection = await UserDetails.getUserCollection();
        return Post.userDetailsCollection;
    }

    static getPost = async (id: ObjectID): Promise<Post | null> => {
        let coll = Post.getCollection();
        return (await coll).findOne({ posts: { $elemMatch: { _id: id } } }, { projection: { 'posts.$': 1 } });
    }

    static getPostRange = async (startingIndex: number, limit: number): Promise<Post[] | null> => {
        let coll = Post.getCollection();
        return ((await (await coll).find({}, { projection: { posts: 1 } }).toArray()).map(x => x.posts).flat().slice(startingIndex, startingIndex + limit));
    }
}

export default Post;