import { Collection } from 'mongodb';
import getDb from '../db';

//User account definition, contains CRUD methods
//User account information is confidential, none of these should be outside of the API server!
class UserAccount {
    email: string; //confidential
    passwordHash: string; //confidential
    username: string; //nonconfidential

    //Mark this as static to avoid collection queries over and over again
    private static _userCollection: Collection<any>;

    constructor(username: string, email: string, passwordHash: string) {
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    //Push user object into database, and return id
    static async create(usr: UserAccount): Promise<string> {
        return (await (await UserAccount.getUserCollection()).insertOne(usr)).insertedId;
    }

    //Update user object that has the same ID 
    static async update(usr: UserAccount, id: string) {
        (await UserAccount.getUserCollection()).updateOne({ _id: id }, usr)
    }

    static async remove(id: string) {
        (await UserAccount.getUserCollection()).deleteOne({ _id: id });
    }

    static async getUserCollection(): Promise<Collection<any>> {
        if (UserAccount._userCollection === undefined)
            UserAccount._userCollection = (await getDb()).collection('users');
        return UserAccount._userCollection;
    }


}

export default UserAccount;


