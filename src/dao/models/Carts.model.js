const mongoose = require("mongoose");

const cartCollection = "cart";

const prodOnCartSchema = new mongoose.Schema({
    id: Number,
    cantidad: Number
})

const cartSchema = new mongoose.Schema({
    products: [prodOnCartSchema],
    status : {
        type:Boolean,
        default:true
    }
});

const Carts = mongoose.model(cartCollection, cartSchema);

module.exports= Carts;