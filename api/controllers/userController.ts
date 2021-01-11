import { NextFunction, Request, Response } from 'express';
import { NetworkAuthenticationRequire } from 'http-errors';
import db from '../db';
import UserAccount from '../models/userAccount'
import UserDetails, { IUserDetails } from '../models/userDetails';

interface getUsersRequestQuery {
    start: number;
    limit: number;
}


export interface IUserPOST {
    profileDescription: string,
    visibleName: string,
    telephone: string,
    contactEmail: string,
    tagids: number[]
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


    updateUserProfile = async (req: Request<{ username: string }, {}, IUserPOST>, res: Response) => {


        // note: we don't try/catch this because if connecting throws an exception
        // we don't need to dispose of the client (it will be undefined)
        const client = await db.pool.connect()
        try {
            await client.query('BEGIN')
            //Insert new post
            let acc = await (await db.query("SELECT id FROM auth WHERE username=$1", [req.params.username])).rows[0]
            if (acc === undefined || acc === null)
            {
                await client.query('ROLLBACK')
                return res.status(404).send("Username not found")
            }
            const ud = await UserDetails.update({ ...req.body, userid: acc.id });
            //Insert user tags
            const tagInsertTasks: Promise<any>[] = []
            await client.query("DELETE FROM userTags where userid=$1", [ud?.userid])
            req.body.tagids.forEach(tagID => {
                tagInsertTasks.push(client.query("INSERT INTO userTags(userid, tagid) VALUES ($1,$2)", [ud?.userid, tagID]))
            });
            await Promise.all(tagInsertTasks);
            await client.query('COMMIT')
            return res.status(200).send();
        } catch (e) {
            await client.query('ROLLBACK')
            res.status(500).send();
            throw e;
        } finally {
            client.release()
        }  
    }
}


export default UserController;