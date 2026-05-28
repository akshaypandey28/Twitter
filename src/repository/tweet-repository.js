const Tweet = require('../models/tweet.js');

class TweetRepository {

    async create(data) {
        try{
            const tweet = await Tweet.create(data);
            return tweet;
        }
        catch(error){
            console.log('tweet creation failed at repository layer', error);
            throw error;
        }
    }

    async get(id){
        try{
            const tweet = await Tweet.findById(id);
            return tweet;
        }
        catch(error){
            console.log('tweet finding failed at repository layer', error);
            throw error;
        }
    }

    async getWithComments(id) {
        try {
            const tweet = await Tweet.findById(id).populate({
                path: 'comments',
                populate: {
                    path: 'comments'
                }
            }).lean(); //lean() is used to convert the mongoose document into a plain javascript object, so that we can add new properties to it
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getAll(offset, limit) {
        try {
            const tweet = await Tweet.find().skip(offset).limit(limit);
            return tweet;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    async update(tweetId,data){
        try{
            const tweet = await Tweet.findByIdAndUpdate(tweetId,data,{new: true});
            return tweet;
        }
        catch(error){
            console.log('tweet updating failed at repository layer', error);
            throw error;
        }
    }

    async destroy(id){
        try{
            const tweet = await Tweet.findByIdAndDelete(id);
            return tweet;
        }
        catch(error){
            console.log('tweet deletion failed at repository layer', error);
            throw error;
        }
    }
}

module.exports = TweetRepository;