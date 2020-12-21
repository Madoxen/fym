import express from 'express'
import UserController from '../controllers/userController'
var router = express.Router();

router.get('/', (req, res, next) => {
    res.send("Welcome to fymate API server!");
});


export default router;
