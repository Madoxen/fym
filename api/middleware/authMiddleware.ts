import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import User from '../models/user';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { exception } from 'console';
import { ObjectId } from 'mongodb';

//Auth middleware that you can plug in to check incoming JWT tokens

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_TTL = process.env.JWT_ACCESS_TOKEN_TTL;
const JWT_REFRESH_TOKEN_TTL = process.env.JWT_REFRESH_TOKEN_TTL;


class AuthMiddleware {

    verifyAccessToken = (req: Request, res: Response, next: NextFunction) => {

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
                        error: "Token refresh is invalid"
                    });
                }

                return next();
            });
        }
    }
}
