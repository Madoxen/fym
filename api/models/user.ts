import { Collection } from 'mongodb';
import getDb from '../db';

//User account definition, contains CRUD methods
class User {
    email: string;
    passwordHash: string;
    username: string;

    //Mark this as static to avoid collection queries over and over again
    static _userCollection: Collection<any>;

    constructor(username: string, email: string, passwordHash: string) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    //Push user object into database, and return id
    static async create(usr: User): Promise<string> {
        return (await (await User.getUserCollection()).insertOne(usr)).insertedId;
    }

    //Update user object that has the same ID 
    static async update(usr: User, id: string) {
        (await User.getUserCollection()).updateOne({ _id: id }, usr)
    }

    static async remove(id: string) {
        (await User.getUserCollection()).deleteOne({ _id: id });
    }

    static async getUserCollection(): Promise<Collection<any>> {
        if (User._userCollection === undefined)
            User._userCollection = (await getDb()).collection('users');
        return User._userCollection;
    }


}

export default User;


