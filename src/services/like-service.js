import {LikeRepository,TweetRepository} from "../repository/index.js";

class LikeService {
    constructor(){
        this.likeRepository = new LikeRepository();
        this.tweetRepository = new TweetRepository();
    }

    async toggleLike(modelId,modelType,userId){ //  /api/v1/likes/toggle?id=modelId&type=Tweet

        console.log(modelId, modelType, userId);

        if(modelType == 'Tweet'){
            var likeable = await this.tweetRepository.find(modelId);//return the tweet object with given id

        }
        else if(modelType == 'Comment'){
            //TODO
        }
        else{
            throw new Error('Unknown model type');
        }

        const exists = await this.likeRepository.findByUserAndLikeable({
            user:userId,
            onModel:modelType,
            likeable:modelId
        });

        if(exists){
            likeable.likes.pull(exists.id); //pull is a mongoose method which will remove the like id from the likes array of the tweet
            await likeable.save();
            await exists.remove();
            var isAdded = false;
        }

        else{
            const newLike = await this.likeRepository.create({
                user:userId,
                onModel:modelType,
                likeable:modelId
            });

            likeable.likes.push(newLike);
            await likeable.save();

            var isAdded = true;
        }

        return isAdded;
    }
}

export default LikeService;