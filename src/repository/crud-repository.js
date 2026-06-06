class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        try {
            const result = await this.model.create(data);
            return result;
        } catch (error) {
            console.log('Creation failed at repository layer', error);
            throw error;
        }
    }

    async get(id) {
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log('Finding failed at repository layer', error);
            throw error;
        }
    }

    async destroy(id) {
        try{
            const result = await this.model.findByIdAndDelete(id);
            return result;
        }  catch (error) {
            console.log('Deletion failed at repository layer', error);
            throw error;
        } 
    }

    async update(id, data) {
        try{
            const result = await this.model.findByIdAndUpdate(id, data, {new: true});
            return result;
        } catch (error) {
            console.log('Updating failed at repository layer', error);
            throw error;
        }
    }

    async getAll() {
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log('Getting all failed at repository layer', error);
            throw error;
        }
    }
}

export default CrudRepository;