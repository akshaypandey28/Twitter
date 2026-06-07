import express from "express";
import {createTweet,getTweet} from '../../controllers/tweet-controller.js';
import {toggleLike} from '../../controllers/like-controller.js';
import {createComment} from '../../controllers/comment-controller.js';
import {signUp,signIn} from '../../controllers/user-controller.js';
import {authenticate} from '../../middlewares/authenticate.js';

const router = express.Router();

//routes related to tweets
router.post('/tweets', authenticate,createTweet);
router.get('/tweets/:id',getTweet);

//routes related to likes
router.post('/likes/toggle',toggleLike);

//routes related to comments
router.post('/comments', authenticate,createComment);


//routes related to users (signUp and login)
router.post('/signUp', signUp);
router.post('/signIn', signIn);


export default router;