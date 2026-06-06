import TweetService from '../services/tweet-service.js';
const tweetService = new TweetService();

export const createTweet = async (req,res) =>{
    try{
        const response = await tweetService.create(req.body);
        res.status(201).json({
            success: true,
            message: 'Tweet created successfully',
            data: response,
            err:{}
        });
    }
    catch(error){
        console.log('Error in creating tweet at controller layer', error);
        res.status(500).json({
            success: false,
            message: 'Tweet creation failed',
            error: error.message
        });
    }
}