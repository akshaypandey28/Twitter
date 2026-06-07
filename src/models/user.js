import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import serverConfig from '../config/serverConfig.js';

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


userSchema.pre('save' , function(next){
    const encryptedPassword = bcrypt.hashSync(this.password, serverConfig.SALT);
    this.password = encryptedPassword;
    next;
});


userSchema.methods.comparePassword = function compare(incomingPassword){
    return bcrypt.compareSync(incomingPassword, this.password);
}

userSchema.methods.genJWT = function generate() {
    return jwt.sign({id: this._id, email: this.email}, serverConfig.JWT_SECRET_KEY, {
        expiresIn: '1h'
    });
}

const User = mongoose.model('User', userSchema);

export default User;