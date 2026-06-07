import express from "express";
import {createTweet,getTweet} from '../../controllers/tweet-controller.js';
import {toggleLike} from '../../controllers/like-controller.js';
import {createComment} from '../../controllers/comment-controller.js';
import {createUser} from '../../controllers/user-controller.js';

const router = express.Router();

//routes related to tweets
router.post('/tweets', createTweet);
router.get('/tweets/:id',getTweet);

//routes related to likes
router.post('/likes/toggle',toggleLike);

//routes related to comments
router.post('/comments', createComment);


//routes related to users
router.post('/users', createUser);

export default router;