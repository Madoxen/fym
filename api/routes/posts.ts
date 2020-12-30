import express from 'express'
import PostController from '../controllers/postController';
import UserController from '../controllers/userController';
import AuthMiddleware from '../middleware/authMiddleware';


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
router.get("/:username", controller.getPostsForUser);

//Create new user post
router.post("/:username", controller.createPost)

//Update user post
router.patch("/:username/:postid", controller.updatePost)

//Remove post with given ID
router.delete("/:username/:postid", controller.deletePost)

export default router;
