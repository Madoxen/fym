import { Collection } from 'mongodb';
import getDb from '../db';

//User account definition, contains CRUD methods
class User {
    ID: string;
    email: string;
    passwordHash: string;
    username: string;

    //Mark this as static to avoid collection queries over and over again
    static _userCollection: Collection<any>;

    constructor(username: string, email: string, passwordHash: string) {
        this.ID = "";
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    //Push user object into database, and return id
    static async create(usr: User): Promise<string> {
        return (await (await User.getUserCollection()).insertOne(usr)).insertedId;
    }

    //Update user object that has the same ID 
    static async update(usr: User) {
        (await User.getUserCollection()).updateOne({ _id: usr.ID }, usr)
    }

    static async remove(usr: User) {
        (await User.getUserCollection()).deleteOne({ _id: usr.ID });
    }

    static async getUserCollection(): Promise<Collection<any>> {
        if (User._userCollection === undefined)
            User._userCollection = (await getDb()).collection('users');
        return User._userCollection;
    }


}

export default User;


