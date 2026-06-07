import {UserRepository} from '../repository/index.js'

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async signUp(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }
        catch(error){
            console.log('Error in creating user at service layer', error);
            throw error;
        }
    }

    async signIn(data){
        try{
            const user = await this.getUserByEmail(data.email);
        
            //step 1: check if user exists with the email provided
            if(!user){
                throw {
                    success: false,
                    message: 'no user found with this email'
                };
            }

            //step 2: check if password is correct
            if(!user.comparePassword(data.password)){
                throw {
                    success: false,
                    message: 'incorrect password'
                };
            }


            //step 3: generate JWT token and send it to client
            const token = user.genJWT();

            return token;
        }
        catch(error){
            console.log('Error in signing in user at service layer', error);
            throw error;
        }
    }

    async getUserByEmail(email){
        try{
            const user = await this.userRepository.findBy({email});
            return user;
        }
        catch(error){
            console.log('Error in getting user by email at service layer', error);
            throw error;            
        }
    }
}

export default UserService;