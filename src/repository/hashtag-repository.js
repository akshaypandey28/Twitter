import Hashtag from '../models/hashtags.js';

class HashtagRepository {

    async create(data) {
        try{
            const tag = await Hashtag.create(data);
            return tag;
        }
        catch(error){
            console.log('Hashtag creation failed at repository layer', error);
            throw error;
        }
    }

    async bulkCreate(data){
        try{
            const tags = await Hashtag.insertMany(data); // data is array of objects
            return tags;
        }
        catch(error){
            console.log('Hashtag creation failed at repository layer', error);
            throw error;
        }
    }

    async get(id){
        try{
            const tag = await Hashtag.findById(id);
            return tag;
        }
        catch(error){
            console.log('Hashtag finding failed at repository layer', error);
            throw error;
        }
    }

    async destroy(id){
        try{
            const tag = await Hashtag.findByIdAndDelete(id);
            return tag;
        }
        catch(error){
            console.log('Hashtag deletion failed at repository layer', error);
            throw error;
        }
    }

    async findByName(titleList){
        try{
            const tags = await Hashtag.find({
                title:titleList //title list is array of string(title of hashtags)
            });
            return tags;
        }
        catch(error){
            console.log('Hashtag titleList finding failed at repository layer', error);
            throw error;
        }
    }
}

export default HashtagRepository;