import express from 'express'
import UserController from '../controllers/userController'

var router = express.Router();
var controller = new UserController ();



router.post('/register', controller.registerNewUser);

router.post('/login', controller.login);

router.post('/logout', controller.logout);


export default router;
