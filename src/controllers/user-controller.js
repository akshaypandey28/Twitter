import UserService from "../services/user-service.js";

const userService = new UserService();

export const signUp = async (req,res) => {
    try{
        const response = await userService.signUp(req.body);
        res.status(201).json({
            success: true,
            message: 'User created(signUp) successfully',
            data: response,
            err:{}
        });
    }
    catch(error){
        console.log('Error in creating(signUp) user at controller layer', error);
        res.status(500).json({
            success: false,
            message: 'User creation failed',
            error: error.message
        });
    }
}

export const signIn = async (req,res) => {
    try{
        const token = await userService.signIn(req.body);
        return res.status(200).json({
            success: true,
            message: 'User signed in successfully',
            data: token,
            err:{}            
        });
    }

    catch(error){
        console.log('Error in signing in user at controller layer', error);
        return res.status(500).json({
            success: false,
            message: 'User sign in failed',
            error: error.message
        });
    }
}