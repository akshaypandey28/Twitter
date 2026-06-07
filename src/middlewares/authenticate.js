import passport from "passport";

export const authenticate = (req,res,next) => {
    passport.authenticate('jwt', (err,user) => { //jwt automatically call the strategy(passportAuth) we defined in jwt-middleware and it will return the user if the token is valid 
        if(err) next(err);
        if(!user){
            return res.status(401).json({
                message: 'unauthorized access no token provided or token is invalid',
            })
        }
        req.user = user; //if user is found , then we will create user property in request 
        //and assign the user to it, so that we can access the user in the 
        //next middleware or controller

        next();
    })(req, res, next); //we are calling the authenticate function immediately after defining it,
    // and we are passing the req, res and next to it, because passport.authenticate returns 
    // a function which takes req, res and next as parameters
}