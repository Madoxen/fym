import { NextFunction, Request, Response } from 'express';
import UserAccount from '../models/userAccount'
import UserDetails from '../models/userDetails';

class UserController {

    getUsers = async (req: Request, res: Response) => {

        if (req.params.username !== undefined) {

            let details = await UserDetails.getUserDetails(req.params.username);

            if (details === null)
                return res.status(404).send({ error: "Username not found" })
            return res.status(200).json(details);
        }
        else {
            return res.status(404).send();
        }
    }

    updateUserProfile = async (req: Request, res: Response) => {

        let newDetails = new UserDetails(req.params.username);
        newDetails.profileDescription = req.body.profileDescription;
        newDetails.visibleName = req.body.visibleName;
        newDetails.telephone = req.body.telephone;
        newDetails.contactEmail = req.body.contactEmail;

        try {
            await UserDetails.update(newDetails);
            return res.status(200).send();
        }
        catch
        {
            return res.status(500).send();
        }
    }
}


export default UserController;