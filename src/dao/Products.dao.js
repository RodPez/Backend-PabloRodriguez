const Products = require("./models/Products.model");

class ProductsDao {
    constructor() {}

    async findAll(){
        try {
            const allProd = await Products.find({status:true});
            return allProd;
        } catch (error) {
            return error
        }
    }

    async findOne(id){
        try {
            return await Products.findOne({_id:id,status:true},{})
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

    async update(updateProdId,updateProdInfo){
        try {
            return Products.updateOne(updateProdId,updateProdInfo)
        } catch (error) {
            return error
        }
    }
}

module.exports = ProductsDao;