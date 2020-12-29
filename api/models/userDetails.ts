import { Collection, Cursor, ObjectId } from "mongodb";
import { start } from "repl";
import getDb from "../db";
import { Post } from "./post";


//Class containing user details, such as profile description, visible name, contact info etc. (non confidential data that can be sent outside)
//and CRUD methods


class UserDetails  {
    readonly _id: ObjectId; //Unique
    readonly username: string; //Unique
    profileDescription: string = "";
    visibleName: string = "";
    telephone: string = "";
    contactEmail: string = "";
    posts: Post[] = []; //Embedd 

    //We need to provide associated username for UserDetails
    constructor(username: string) {
        this._id = new ObjectId();
        this.username = username;
    }

    private static userDetailsCollection: Collection<UserDetails>;

    //Push user object into database, and return id
    static async insert(usr: UserDetails) {
        UserDetails.getUserCollection().then(collection => collection.insertOne(usr));
    }

    //Update user object that has the same ID 
    static async update(usr: UserDetails) {
        (await UserDetails.getUserCollection()).updateOne({ username: usr.username }, { $set: usr })
    }

    static async remove(username: string) {
        (await UserDetails.getUserCollection()).deleteOne({ username: username });
    }

    static async getUserCollection(): Promise<Collection<UserDetails>> {
        if (UserDetails.userDetailsCollection === undefined)
            UserDetails.userDetailsCollection = (await getDb()).collection('userDetails');
        return UserDetails.userDetailsCollection;
    }

    static getUserDetails = async (username: string): Promise<UserDetails | null> => {
        let coll = UserDetails.getUserCollection();
        return (await coll).findOne({ username: username });
    }

    static getUserDetailsRange = async (startingIndex: number, limit: number): Promise<UserDetails[] | null> => {
        let coll = UserDetails.getUserCollection();
        return (await coll).find().skip(startingIndex).limit(limit).toArray();
    }

}

export default UserDetails;