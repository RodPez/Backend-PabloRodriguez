const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productCollection = "product";

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code:{
        type : String,
        unique: true
    },
    stock: Number,
    status : {
        type: Boolean,
        default:true
    }
});

productSchema.plugin(mongoosePaginate);
const Products = mongoose.model(productCollection, productSchema);

module.exports= Products;



