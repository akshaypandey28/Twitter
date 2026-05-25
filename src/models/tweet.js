const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({ //it's only creation of schema, not the model
    content:{
        type: String,
        required: true
    },
    userEmail:{
        type: String,
        required: true
    },
    comments:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, 
    { timestamps: true }
);


const Tweet = mongoose.model('Tweet', tweetSchema); //model is created using the schema

module.exports = Tweet;