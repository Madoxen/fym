//User controller middleware
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { exception } from 'console';



const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL;
const JWT_REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_TOKEN_TTL;


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

            let existing = await User.getUserCollection().then(r => r.findOne({ username: req.body.username }))
            if (existing !== undefined && existing !== null) {
                  res.status(409).send();
                  return;
            }


            //create new user
            let u = new User(req.body.username, req.body.email, pass_hash);
            try //try push to database
            {
                  let uid = User.create(u);
                  res.status(200).send(this.generateTokens(req, await uid));
            }
            catch (err) {
                  console.log(err)
                  res.status(500).send();
            }
      }


      generateTokens(req: Request, userID: string) {
            //create access token, with subject user._id, sign with our secret and expire in TTL milliseconds
            if (JWT_ACCESS_TOKEN_SECRET !== undefined) {
                  let access_token = jwt.sign({ sub: userID, type: "ACCESS_TOKEN" },
                        JWT_ACCESS_TOKEN_SECRET,
                        { expiresIn: JWT_ACCESS_TOKEN_TTL ? JWT_ACCESS_TOKEN_TTL : 500 })
            }
            else
                  throw "access secret not found";

            if (JWT_REFRESH_TOKEN_SECRET !== undefined) {
                  //create refresh token, with subject user._id, sign with our secret and expire in TTL milliseconds
                  let refresh_token = jwt.sign({ sub: userID, type: "REFRESH_TOKEN" },
                        JWT_REFRESH_TOKEN_SECRET,
                        { expiresIn: JWT_REFRESH_TOKEN_TTL ? JWT_REFRESH_TOKEN_TTL : 1000 })
            }
            else
                  throw "refresh secret not found";
      }


      //Check credentials and send access token
      async login(req: Request, res: Response, next: NextFunction) {
            if (!req.body.username)
                  res.status(401).send("Username missing");

            if (!req.body.password)
                  res.status(401).send("Password missing");

            try {
                  //First find user in db
                  let u = await User.getUserCollection().then(r => r.findOne({ username: req.body.username }));
                  let passHash = u.passwordHash;
                  //Now having user and password hash compare credentials

                  if (await bcrypt.compare(req.body.password, passHash)) {
                        res.json(this.generateTokens(req, u._id));
                  }
            }
            catch {
                  res.status(401).send("Username or password dont match");
            }
      }

      //Remove access token
      async logout(req: Request, res: Response, next: NextFunction) {

      }
}

export default UserController;
