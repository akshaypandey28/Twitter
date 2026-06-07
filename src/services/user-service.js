import {UserRepository} from '../repository/index.js'

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }

    async create(data){
        try{
            const user = await this.userRepository.create(data);
            return user;
        }
        catch(error){
            console.log('Error in creating user at service layer', error);
            throw error;
        }
    }
}

export default UserService;