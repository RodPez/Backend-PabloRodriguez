const express = require("express");
const ProductManager = require( "../class/ProductManager")
const listaDeProductos =  new ProductManager("../files/Productos.json")
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router")


const app = express();

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

    
app.use("/api/products" ,productsRouter(listaDeProductos));
app.use("/api/carts", cartsRouter)    
    
app.listen(port , () =>{
    console.log(`Server running at por ${port}`);
})



