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

export const getTweet = async (req, res) => {
    try {
        const response = await tweetService.get(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched a tweet from service',
            data: response,
            err: {}
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went wrong',
            data: {},
            err: error
        });
    }
}