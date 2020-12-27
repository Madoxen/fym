//User controller middleware
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import UserAccount from '../models/userAccount';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { exception } from 'console';
import { ObjectId } from 'mongodb';
import isNullOrUndefined from '../utils';


const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL;
const JWT_REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_TOKEN_TTL;

//This controller provides auth services for users
//Uses JWT as an auth mechanism
class AuthController {

      constructor() {

      }

      registerNewUser = async (req: Request, res: Response) => {

            //Hash password
            const salt = await bcrypt.genSalt(10);
            const pass_hash = await bcrypt.hash(req.body.password, salt);

            let existing = await UserAccount.getUserCollection().then(r => r.findOne({ username: req.body.username }))
            if (existing !== undefined && existing !== null) { //If exists user with username
                  res.status(409).send(); //Send 409 (conflict) because we cannot create user with the same username as existing user
                  return;
            }

            //create new user
            let u = new UserAccount(req.body.username, req.body.email, pass_hash);
            try //try push to database
            {
                  let uid = await UserAccount.create(u); //wait for DB
                  res.status(200).send(this.generateTokens(req, u.username)); //after DB has successfully inserted a user, send 200
            }
            catch (err) {
                  console.log(err)
                  res.status(500).send();
            }
      }


      generateTokens = (req: Request, username: string) => {
            //create access token, with subject user.username, sign with our secret and expire in TTL milliseconds
            let access_token: string = "";
            let refresh_token: string = "";
            if (JWT_ACCESS_TOKEN_SECRET !== undefined && JWT_ACCESS_TOKEN_SECRET !== null) {
                  access_token = jwt.sign({ sub: username, type: "ACCESS_TOKEN" },
                        JWT_ACCESS_TOKEN_SECRET,
                        { expiresIn: JWT_ACCESS_TOKEN_TTL !== undefined && JWT_ACCESS_TOKEN_TTL !== null ? JWT_ACCESS_TOKEN_TTL + "s" : "60s" })

            }
            else
                  throw "access secret not found";

            if (JWT_REFRESH_TOKEN_SECRET !== undefined && JWT_ACCESS_TOKEN_SECRET !== null) {
                  //create refresh token, with subject user.username, sign with our secret and expire in TTL milliseconds
                  refresh_token = jwt.sign({ sub: username, type: "REFRESH_TOKEN" },
                        JWT_REFRESH_TOKEN_SECRET,
                        { expiresIn: JWT_REFRESH_TOKEN_TTL !== undefined && JWT_REFRESH_TOKEN_TTL !== null ? JWT_REFRESH_TOKEN_TTL + "s" : "600s" })
            }
            else
                  throw "refresh secret not found";


            return { acc: access_token, ref: refresh_token }
      }


      //Check credentials and send access token
      login = async (req: Request, res: Response) => {
            if (!req.body.username)
                  res.status(401).send("Username missing");

            if (!req.body.password)
                  res.status(401).send("Password missing");


            try {
                  //First find user in db
                  let u = await UserAccount.getUserCollection().then(r => r.findOne({ username: req.body.username }));
                  let passHash = u.passwordHash;
                  //Now having user and password hash compare credentials

                  if (await bcrypt.compare(req.body.password, passHash)) {
                        res.json(this.generateTokens(req, u.username));
                  }
                  else {
                        throw "password bad ree";
                  }
            }
            catch {
                  res.status(401).send("Username or password dont match");
            }
      }

      refreshToken = async (req: Request, res: Response) => {
            // Verify refreshToken 
            if (JWT_REFRESH_TOKEN_SECRET !== undefined && JWT_REFRESH_TOKEN_SECRET !== null) {
                  if (!req.headers.authorization) {
                        return res.status(401).send({
                              message: "Auth header missing"
                        })
                  }


                  const BEARER = 'Bearer'
                  const REFRESH_TOKEN = req.headers.authorization.split(' ') //split BEARER TOKEN

                  if (REFRESH_TOKEN[0] !== BEARER) {
                        return res.status(401).send({
                              error: "Missing bearer"
                        })
                  }

                  //Verify user token with our secret
                  //If JWT was changed, it's signature cannot be correct without the key
                  //so for example non admin user could not get admin access simply by changing admin field
                  jwt.verify(REFRESH_TOKEN[1], JWT_REFRESH_TOKEN_SECRET, async (err: any, payload: any) => {
                        if (err) {
                              return res.status(401).send({
                                    error: "Token refresh is invalid"
                              });
                        }

                        let u = await UserAccount.getUserCollection().then(r => r.findOne({ username: payload.sub }))
                        console.log(payload.sub);
                        if (!u) {
                              return res.status(401).send({
                                    error: 'User not found'
                              });
                        }

                        return res.json(this.generateTokens(req, req.body.username)); //return new fresh tokens (both access and refresh tokens)
                  });
            }
            else {
                  return res.status(500).send("Secret missing");
            }
      }
}

export default AuthController;