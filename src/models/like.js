import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    onModel:{
        type: String,
        required: true,
        enum: ['Tweet', 'Comment']
    },

    likeable:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' //it will refer to the model which is mentioned in onModel field
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true});

const Like = mongoose.model('Like', likeSchema);

export default Like;