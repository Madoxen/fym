//User controller middleware
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import User from '../models/user';


class UserController {

      constructor() {
            this.registerNewUser = this.registerNewUser.bind(this);
            this.login = this.login.bind(this);
            this.logout = this.logout.bind(this);
      }


      async registerNewUser(req: Request, res: Response, next: NextFunction) {
            //Hash password
            const salt = await bcrypt.genSalt(10);
            const pass_hash = await bcrypt.hash(req.body.password, salt);

            //create new user
            let u = new User(req.body.username, req.body.email, pass_hash);
            try //try push to database
            {
                  let uid = User.create(u);
                  u.ID = await uid;
                  res.status(200).send(u.ID);
            }
            catch
            {
                  res.status(500).send();
            }
      }

      login(req: Request, res: Response, next: NextFunction) {




      }

      logout(req: Request, res: Response, next: NextFunction) {

      }
}

export default UserController;