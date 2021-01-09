import { NextFunction, Request, Response } from 'express';
import db from '../db';
import UserAccount from '../models/userAccount'
import UserDetails, { IUserDetails } from '../models/userDetails';

interface getUsersRequestQuery {
    start: number;
    limit: number;
}


class UserController {

    getUser = async (req: Request<{ username: string }>, res: Response) => {
        if (req.params.username !== undefined) {

            let result = await (await db.query(`SELECT auth.username, ud.profiledescription, ud.phone, ud.email FROM userdetails ud
            INNER JOIN auth ON auth.id = ud.accountid WHERE auth.username=$1 LIMIT 1`, [req.params.username])).rows[0]
            if (result === undefined || result === null)
                return res.status(404).send("Username not found" )
                
            return res.status(200).json(result);
        }
        else {
            return res.status(404).send();
        }
    }

    getUsers = async (req: Request<{}, {}, {}, getUsersRequestQuery>, res: Response<IUserDetails[]>) => {
        let details = await UserDetails.getUserDetailsRange(req.query.start, req.query.limit);
        if (details !== null)
            return res.status(200).json(details);
        return res.status(404).send();
    }


    updateUserProfile = async (req: Request<{ username: string }, {}, IUserDetails>, res: Response) => {
        try {
            let acc = await (await db.query("SELECT id FROM auth WHERE username=$1", [req.params.username])).rows[0]
            if (acc === undefined || acc === null)
                return res.status(404).send("Username not found")
            await UserDetails.update({ ...req.body, id: acc.id });
            return res.status(200).send();
        }
        catch
        {
            return res.status(500).send();
        }
    }
}


export default UserController;