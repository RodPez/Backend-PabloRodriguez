const mongoose = require("mongoose");

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

const Products = mongoose.model(productCollection, productSchema);

module.exports= Products;



