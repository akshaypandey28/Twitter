import { TweetRepository, HashtagRepository } from '../repository/index.js'

class TweetService {
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data){
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g)
            .map((tag) => tag.substring(1).toLowerCase()); // this regex extracts hashtags

        console.log(tags);
        const tweet = await this.tweetRepository.create(data);
        
        //already present hashtags
        const alreadyPresentTags = await this.HashtagRepository.findByName(tags); 
        //(tags is array of string(title of hashtags) and alreadyPresentTags is array of objects)

        //title of present hashtags
        let titleOfPresenttags = alreadyPresentTags.map(tags => tags.title);//titleOfPresenttags is array of string(title of hashtags)

        //title of new hashtags
        let newTags = tags.filter(tag => !titleOfPresenttags.includes(tag)); //newTags is array of string(title of hashtags)

        newTags = newTags.map(tag => { //i have to make newTags in array of objects because hashtag model will accept object , not array
            return {title: tag, tweets: [tweet.id]}
        });

        await this.hashtagRepository.bulkCreate(newTags);

        //now i have to update the tweets array of already present hashtags => { title{} , tweets[]}
        alreadyPresentTags.forEach((tag) => {
            tag.tweets.push(tweet.id); 
            tag.save();
        });

        return tweet;
    }

    async get(tweetId) {
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }
}