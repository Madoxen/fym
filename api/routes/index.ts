import express from 'express'
import AuthController from '../controllers/authController'
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Welcome to fymate API server!");
});


export default router;
