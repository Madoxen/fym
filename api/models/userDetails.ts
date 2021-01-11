import { start } from "repl";
import db from "../db";
import { Post } from "./post";


//Class containing user details, such as profile description, visible name, contact info etc. (non confidential data that can be sent outside)
//and CRUD methods

export interface IUserDetails {

    readonly userid?: number; //Unique
    profileDescription?: string;
    telephone?: string;
    contactEmail?: string;
}


class UserDetails implements IUserDetails {
    readonly accountid: number;
    readonly userid: number; //Unique
    profileDescription: string = "";
    telephone: string = "";
    contactEmail: string = "";

    //We need to provide associated username for UserDetails
    constructor(userid: number, accountid: number) {
        this.userid = userid;
        this.accountid = accountid;
    }

    //Push user object into database, and return id
    static async insert(usr: IUserDetails, account_id: number): Promise<UserDetails | null> {
        return db.query("INSERT INTO userDetails (accountid, profiledescription, phone, email) VALUES ($1,$2,$3,$4) RETURNING *",
            [account_id, usr.profileDescription, usr.telephone, usr.contactEmail])
            .then(res => res.rows[0])
            .catch(null);
    }

    //Update user object that has the same ID 
    static async update(usr: IUserDetails): Promise<UserDetails | null> {
        return db.query("UPDATE userDetails SET profileDescription=$1, phone=$2, email=$3 WHERE userID=$4 RETURNING *",
            [usr.profileDescription, usr.telephone, usr.contactEmail, usr.userid])
            .then(res => res.rows[0])
            .catch(null);
    }

    static getUserDetails = async (id: number): Promise<IUserDetails | null> => {
        return db.query("SELECT * FROM userDetails WHERE userid = $1", [id]).then(res => res.rows[0]).catch(null);
    }

    static getUserDetailsRange = async (startingIndex: number, limit: number): Promise<any> => {
        return db.query(`SELECT auth.username, ud.profiledescription, ud.phone, ud.email FROM userdetails ud
        INNER JOIN auth ON auth.id = ud.accountid LIMIT $2 OFFSET $1`, [startingIndex, limit])
            .then(res => res.rows)
            .catch(null);
    }
}

export default UserDetails;