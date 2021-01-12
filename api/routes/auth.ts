import express from 'express'
import { body, header, param, sanitizeBody } from 'express-validator';
import AuthController from '../controllers/authController'
import AuthMiddleware from '../middleware/authMiddleware';
import ValidationMiddleware from '../middleware/validationMiddleware';

var router = express.Router();
var controller = new AuthController();

router.post('/register',
    [body('password', 'Password must be a string').isString().escape(),
    body('username', 'Username must be a string').isString().escape(),
    body('email', 'Email must be a valid email address').isEmail().escape()], ValidationMiddleware.onValidationChainEnd, controller.registerNewUser);

router.post('/login', [body('password', 'Password must be a string').isString().escape(),
body('username', 'Username must be a string').isString().escape()], ValidationMiddleware.onValidationChainEnd, controller.login);

router.post('/refresh', ValidationMiddleware.onValidationChainEnd, controller.refreshToken);

router.delete('/register/:username', AuthMiddleware.verifyAccessToken);
router.delete('/register/:username', AuthMiddleware.verifyUserOnTokenPayload);
router.delete('/register/:username', [param('username', 'Username must be a string').isString().escape()], ValidationMiddleware.onValidationChainEnd, controller.deleteUser);


export default router;
