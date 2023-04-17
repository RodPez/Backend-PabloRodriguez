const Products = require("./models/Products.model");

class ProductsDao {
    constructor() {}

    async findAll(query,ordenar, limite, pagina){
        try {
            const filtro = query ? { $text: { $search: query } } : {};
            const allProd = await Products.paginate({ status: true, ...filtro },{sort: ordenar,limit: limite, page:pagina});
            return {
                products: allProd.docs, 
                pagination: {
                  page: parseInt(allProd.page),
                  nextPage: allProd.page + 1,
                  prevPage: allProd.page - 1, 
                  totalPages: allProd.totalPages, 
                  totalDocs:allProd.totalDocs, 
                  hasNextPage: allProd.hasNextPage, 
                  hasPrevPage: allProd.hasPrevPage 
                }
            };
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