const Messages = require("./models/Messages.model");

class MessagesDao {
    constructor() {}

    async findAll(){
        try {
            const allMessages = await Messages.find({});
            return allMessages;
        } catch (error) {
            return error
        }
    }

    async create(newMessageInfo){
        try {
            return await Messages.create(newMessageInfo);
        } catch (error) {
            return error
        }
    }
}

module.exports = MessagesDao;