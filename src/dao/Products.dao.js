const Products = require("./models/Products.model");

class ProductsDao {
    constructor() {}

    async findAll(){
        try {
            const allProd = await Products.find();
            return allProd;
        } catch (error) {
            return error
        }
    }

    async createMany(newProducstInfo){
        try {
            return await Products.insertMany(newProducstInfo);
        } catch (error) {
            return error
        }
    }

    async create(newProductInfo){
        try {
            return Products.create(newProductInfo);
        } catch (error) {
            return error
        }
    }
}

module.exports = ProductsDao;