import { Collection } from "mongodb";
import getDb from "../db";

//Class containing user details, such as profile description, visible name, contact info etc. (non confidential data that can be sent outside)
//and CRUD methods
class UserDetails {

    username: string = "";
    profileDescription: string = "";
    visibleName: string = "";
    telephone: string = "";
    contactEmail: string = "";

    constructor() {

    }

    private static userDetailsCollection: Collection<any>;

    //Push user object into database, and return id


    //Update user object that has the same ID 
    static async update(usr: UserDetails, id: string) {
        (await UserDetails.getUserCollection()).updateOne({ _id: id }, usr)
    }

    static async remove(id: string) {
        (await UserDetails.getUserCollection()).deleteOne({ _id: id });
    }

    static async getUserCollection(): Promise<Collection<UserDetails>> {
        if (UserDetails.userDetailsCollection === undefined)
            UserDetails.userDetailsCollection = (await getDb()).collection('users');
        return UserDetails.userDetailsCollection;
    }


}