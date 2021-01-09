
import db from '../db';

//User account definition, contains CRUD methods
//User account information is confidential, none of these should be outside of the API server!
class UserAccount {
    id?: number;
    email: string; //confidential
    passwordHash: string; //confidential
    username: string; //nonconfidential

    //TODO: require only readonly properties in the constructor
    constructor(username: string, email: string, passwordHash: string) {
        this.id = 0;
        this.username = username;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    //Push user object into database, and return id
    static async insert(usr: UserAccount): Promise<UserAccount | null> {
        return db.query("INSERT INTO auth (username, passwordhash, email) VALUES ($1, $2, $3) RETURNING *",
            [usr.username, usr.passwordHash, usr.email])
            .then(res => res.rows[0])
            .catch(null)
    }

    //Update user object that has the same ID 
    static async update(usr: UserAccount) {
        db.query("UPDATE auth SET username=$1, passwordhash=$2, email=$3 WHERE id = $4", [usr.username, usr.passwordHash, usr.email, usr.id])
    }

    static async remove(id: string) {
        db.query("DELETE FROM auth WHERE id = $1", [id])
    }

    static async getAccFromUsername(username: string) : Promise<UserAccount | null>
    {
        return db.query("SELECT * FROM auth WHERE username=$1", [username])
        .then(res => res.rows[0])
        .catch(null)
    }

}

export default UserAccount;


