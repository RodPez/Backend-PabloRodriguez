const mongoose = require("mongoose");

const cartCollection = "cart";

const cartSchema = new mongoose.Schema({
    products:{
        type: [
            {
                product:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"
            },
            cantidad: Number
        }
    ],
    default:[]
    },
    status : {
        type:Boolean,
        default:true
    }
});

cartSchema.pre(["find", "findOne"], function () {
    this.populate("products.product")
})

const Carts = mongoose.model(cartCollection, cartSchema);

module.exports= Carts;