const express = require("express");

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router")

//listaDeProductos.getProducts();

const app = express();

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products" , productsRouter)
app.use("/api/carts", cartsRouter)


app.listen(port , () =>{
    console.log(`Server running at por ${port}`);
})