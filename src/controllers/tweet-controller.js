import TweetService from '../services/tweet-service.js';
import upload from '../config/file-upload-s3-config.js';

const singleUploader = upload.single('image'); //this is the middleware which will be used 
//in the route to upload a single image with the key 'image' in the form-data
const tweetService = new TweetService();

export const createTweet = async (req,res) =>{
    try{
        singleUploader(req,res, async function(err,data){
            if(err){
                console.log('Error in uploading file', err);
                return res.status(500).json({
                    success: false,
                    message: 'Error in uploading file',
                    data: {},
                    err: err
                });
            }
            console.log('image url is ',req.file);

            const payload = {...req.body}; //payload is object which will be passed to service

            payload.image = req.file.location;
            const response = await tweetService.create(payload);
            res.status(201).json({
                success: true,
                message: 'Tweet created successfully',
                data: response,
                err:{}
            });
        });
    }
    catch(error){
        console.log('Error in creating tweet at controller layer', error);
        res.status(500).json({
            success: false,
            message: 'Tweet creation failed at controller layer',
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