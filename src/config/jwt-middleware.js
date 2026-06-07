import JWT from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/user.js';

dotenv.config();

const JwtStrategy = JWT.Strategy;

const ExtractJWT = JWT.ExtractJwt;

const opts = {
    jwtFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_SECRET_KEY
}


export const passportAuth = (passport) =>{
    try{
        passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
            const user = await User.findById(jwt_payload.id);
            if(!user){ //if user is not found, then we will return false, which means authentication failed
                done(null, false);
            }
            else { //if user is found, then we will return the user
                done(null, user);
            }
        }));
    }
    catch(error){
        console.log('Error in passport authentication', error);
    }
}