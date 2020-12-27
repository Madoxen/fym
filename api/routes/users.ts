import express from 'express'
import UserController from '../controllers/userController';
import AuthMiddleware from '../middleware/authMiddleware';


var router = express.Router();
var controller = new UserController();



//Return every user details 
//(with some resonable limit of course)
router.get('/', controller.getUsers)


//gets userDetails
//Everyone can see any profile details 
router.get('/:username', controller.getUsers);


//Change user details

//First check if they provided correct JWT token
router.post("/:username", AuthMiddleware.verifyAccessToken);
router.post("/:username", AuthMiddleware.verifyUserOnTokenPayload);
<<<<<<< HEAD
router.post("/:username", controller.updateUserProfile);
=======


>>>>>>> master


export default router;
