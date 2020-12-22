import { NextFunction, Request, Response } from 'express';
import UserAccount from '../models/userAccount'

class UserController {


    getUsers = (req: Request, res: Response, next: NextFunction) => {
        res.status(404).send();
    }

}


export default UserController;