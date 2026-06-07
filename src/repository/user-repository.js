import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
    constructor(){
        super(User);        
    }

    async findBy(data){
        try{
            const response = await User.findOne(data);
            return response;
        }
        catch(error){
            console.log('Finding user by email failed at repository layer', error);
            throw error;
        }
    }
}

export default UserRepository;