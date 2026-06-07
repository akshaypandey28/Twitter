import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({ //it's only creation of schema, not the model
    content:{
        type: String,
        required: true,
        max: [250, 'Tweet cannot be more than 250 characters']
    },
    
    hashtags:[ //every tweet will have many hashtags
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ],

    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ],

    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],

    image:{
        type: String
    }
    
}, 
    { timestamps: true }
);


const Tweet = mongoose.model('Tweet', tweetSchema); //model is created using the schema

export default Tweet;