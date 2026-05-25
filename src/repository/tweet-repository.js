const Tweet = require('../models/tweet.js');

class TweetRepository {

    async create(data) {
        try{
            const tweet = await Tweet.create(data);
            return tweet;
        }
        catch(error){
            console.log('tweet creation failed at repository layer', error);
        }
    }

    async get(id){
        try{
            const tweet = await Tweet.findById(id);
            return tweet;
        }
        catch(error){
            console.log('tweet finding failed at repository layer', error);
        }
    }

    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments',
                populate: {
                    path: 'comments'
                }
            }).lean();
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async update(tweetId,data){
        try{
            const tweet = await Tweet.findByIdAndUpdate(tweetId,data,{new: true});
            return tweet;
        }
        catch(error){
            console.log('tweet updating failed at repository layer', error);
        }
    }

    async destroy(id){
        try{
            const tweet = await Tweet.findByIdAndDelete(id);
            return tweet;
        }
        catch(error){
            console.log('tweet deletion failed at repository layer', error);
        }
    }
}

module.exports = TweetRepository;