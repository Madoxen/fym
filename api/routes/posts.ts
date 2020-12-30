import express from 'express'
import { body, param } from 'express-validator';
import PostController from '../controllers/postController';
import UserController from '../controllers/userController';
import AuthMiddleware from '../middleware/authMiddleware';
import ValidationMiddleware from '../middleware/validationMiddleware';


var router = express.Router();
var controller = new PostController();



//POST, DELETE methods in post router must be authenticated
router.post('/:username/*', AuthMiddleware.verifyAccessToken);
router.post('/:username/*', AuthMiddleware.verifyUserOnTokenPayload);

router.delete('/:username/*', AuthMiddleware.verifyAccessToken);
router.delete('/:username/*', AuthMiddleware.verifyUserOnTokenPayload);

//POST, DELETE methods in post router must be authenticated
router.patch('/:username/*', AuthMiddleware.verifyAccessToken);
router.patch('/:username/*', AuthMiddleware.verifyUserOnTokenPayload);




//Get any, one post or collection of posts
router.get("/", controller.findPosts)

//Get posts from a user
router.get("/:username",
    [param('username').isString().escape()],
    ValidationMiddleware.onValidationChainEnd,
    controller.getPostsForUser);


//Create new user post
router.post("/:username", [param('username', 'Username must be a string').isString().escape(),
body('content', 'Content must be a string').isString().escape(),
body('title', 'Title must be a string').isString().escape(),
body('tagIDs', 'tagIDs must be an array').isArray()],
    ValidationMiddleware.onValidationChainEnd,
    controller.createPost)

//Update user post
router.patch("/:username/:postid",
    [param('username', 'Username must be a string').isString().escape(),
    param('postid', 'Postid must be a number').isNumeric(),
    body('content', 'Content must be a string').isString().escape(),
    body('title', 'Title must be a string').isString().escape(),
    body('tagIDs', 'tagIDs must be an array').isArray()],
    ValidationMiddleware.onValidationChainEnd)
router.patch("/:username/:postid", controller.updatePost)

//Remove post with given ID
router.delete("/:username/:postid",
    [param('username', 'Username must be a string').isString().escape(),
    param('postid', 'Postid must be a number').isNumeric()],
    ValidationMiddleware.onValidationChainEnd)
    
router.delete("/:username/:postid", controller.deletePost)

export default router;
