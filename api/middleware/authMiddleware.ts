import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import UserAccount from '../models/userAccount';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { exception } from 'console';
import { ObjectId } from 'mongodb';
import { ReplOptions } from 'repl';
import AuthController from '../controllers/authController';

//Auth middleware that you can plug in to check incoming JWT tokens

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL;
const JWT_REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_TOKEN_TTL;


class AuthMiddleware {

    //Verifies if access token is from this server, and wasnt tempered with
    //If everything is OK, then token payload is added to res locals, so that it can be consumed
    //by later middleware
    //If something is wrong with a token 401 is sent and middleware chain broken
    static verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {

        let token = req.headers.authorization;
        // Verify refreshToken 
        if (JWT_ACCESS_TOKEN_SECRET !== undefined && JWT_ACCESS_TOKEN_SECRET !== null) {
            if (!token) {
                return res.status(401).send({
                    message: "Auth header missing"
                })
            }

            if (token?.startsWith("Bearer ")) {
                token = token.slice(7, token.length).trimLeft();
            }

            jwt.verify(token, JWT_ACCESS_TOKEN_SECRET, async (err: any, payload: any) => {
                if (err) {
                    return res.status(401).send({
                        error: "Access token is invalid"
                    });
                }
                res.locals.tokenPayload = payload;
                return next(); //handoff control to next middleware
            });
        }
    }


    static verifyUserOnTokenPayload = async (req: Request, res: Response, next: NextFunction) => {
        let payload = res.locals.tokenPayload;

        if (payload === undefined)
            return res.status(500).send();

        //Check if user in token matches the user in the request url
        if (req.params.username !== payload.sub) {
            return res.status(401).send(); //if not this user is not authorized
        }

        //Check if such username exists
        let user = await UserAccount.getUserCollection().then(r => r.findOne({ username: payload.sub }));

        if (user === undefined || user === null)
            return res.status(401).send(); //user does not exist, 401 unauthorized

        return next(); //if everythings OK, go to next middleware
    }
}


export default AuthMiddleware;