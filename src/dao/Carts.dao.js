const Carts = require("./models/Carts.model");

class CartsDao {
    constructor() {}

    async findAll(){
        try {
            const allCarts = await Carts.find({status:true});
            return allCarts;
        } catch (error) {
            return error
        }
    }

    async createMany(newCartsInfo){
        try {
            return await Carts.insertMany(newCartsInfo);
        } catch (error) {
            return error
        }
    }

    async create(newCartInfo){
        try {
            return Carts.create(newCartInfo);
        } catch (error) {
            return error
        }
    }

    async update(updateCartId,updateCartInfo){
        try {
            return Carts.updateOne(updateCartId,updateCartInfo)
        } catch (error) {
            return error
        }
    }

    async deleteAll(){
        return await Carts.deleteMany();
    }
}

module.exports = CartsDao;