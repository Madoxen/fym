//User controller middleware
import bcrypt from 'bcrypt'
import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';


class UserController{

      constructor()
      {
            this.registerNewUser = this.registerNewUser.bind(this);
            this.login = this.login.bind(this);
            this.logout = this.logout.bind(this);
      }


      async registerNewUser(req : Request, res : Response, next : NextFunction)
      {
            //Hash password
            const salt = await bcrypt.genSalt(10);
            const pass_hash = await bcrypt.hash("TODO: add password", salt);
            next(createError(502));
      }
      
      login(req : Request, res : Response, next : NextFunction)
      {
            
      }
      
      logout(req : Request, res : Response, next : NextFunction)
      {
      
      }
}

export default UserController;