import express from 'express'
import AuthController from '../controllers/authController'
import AuthMiddleware from '../middleware/authMiddleware';

var router = express.Router();
var controller = new AuthController();



router.post('/register', controller.registerNewUser);

router.post('/login', controller.login);

router.post('/refresh', controller.refreshToken);

router.delete('/register/:username', AuthMiddleware.verifyAccessToken);
router.delete('/register/:username', AuthMiddleware.verifyUserOnTokenPayload);
router.delete('/register/:username', controller.deleteUser);


export default router;
