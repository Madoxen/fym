import express from 'express'
import AuthController from '../controllers/authController'

var router = express.Router();
var controller = new AuthController ();



router.post('/register', controller.registerNewUser);

router.post('/login', controller.login);

router.post('/logout', controller.logout);

router.post('/refresh', controller.refreshToken);



export default router;
