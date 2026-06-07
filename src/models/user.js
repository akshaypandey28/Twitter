import mongoose from "mongoose";
import validator from 'validator';

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email format"
        }
    },

    password:{
        type: String,
        required: true
    },

    username:{
        type: String,
        required: true,
        unique: true
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;