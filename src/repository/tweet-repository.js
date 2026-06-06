import Tweet from '../models/tweet.js'
import CrudRepository from './crud-repository.js';

class TweetRepository extends CrudRepository {

    constructor(){
        super(Tweet);
    }

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

    async find(id) {
        try {
            const tweet = await Tweet.findById(id).populate({path: 'likes'});
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default TweetRepository;