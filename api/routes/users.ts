import express from 'express'
import { body, check, param } from 'express-validator';
import UserController from '../controllers/userController';
import AuthMiddleware from '../middleware/authMiddleware';
import ValidationMiddleware from '../middleware/validationMiddleware';


var router = express.Router();
var controller = new UserController();


//Return every user details 
//(with some resonable limit of course)
router.get('/', controller.getUsers)


//gets userDetails
//Everyone can see any profile details 
router.get('/:username', [param('username').isString().escape()], controller.getUser);


//Change user details

//First check if they provided correct JWT token
router.post("/:username", AuthMiddleware.verifyAccessToken);
router.post("/:username", AuthMiddleware.verifyUserOnTokenPayload);
router.post("/:username", [param('username', 'Username must be a string').isString().escape(),
body('profileDescription', 'ProfileDescription must be a string').isString().escape(),
body('telephone', 'Telephone must be a string').isString().escape(),
body('contactEmail', 'contactEmail must be a valid email').isEmail().normalizeEmail().escape()
], ValidationMiddleware.onValidationChainEnd ,controller.updateUserProfile);

export default router;
