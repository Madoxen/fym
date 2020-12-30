import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


class ValidationMiddleware {
    static onValidationChainEnd = (req: Request, res: Response, next: NextFunction) => {
        // validationResult function checks whether 
        // any occurs or not and return an object 
        const errors = validationResult(req);

        // If some error occurs, then this 
        // block of code will run 
        if (!errors.isEmpty()) {
            return res.status(400).json(errors)
        }
        else {
            return next();
        }
    }
}

export default ValidationMiddleware