import UserService from "../services/user-service.js";

const userService = new UserService();

export const createUser = async (req,res) => {
    try{
        const response = await userService.create(req.body);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: response,
            err:{}
        });
    }
    catch(error){
        console.log('Error in creating user at controller layer', error);
        res.status(500).json({
            success: false,
            message: 'User creation failed',
            error: error.message
        });
    }
}