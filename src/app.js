const express = require("express");
const handlebars = require("express-handlebars");
const ProductManager = require( "../class/ProductManager");
const CartsManager = require("../class/CartsManager");
const pathCarts = "./files/Carritos.json";
const pathProd = "./files/Productos.json";
const listaDeProductos =  new ProductManager(pathProd);
const listaDeCarts = new CartsManager(pathCarts);

const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router")
const indexRouter = require("./routes/index.router")

const app = express();

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")



const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
      
app.use("/api/products" ,productsRouter(listaDeProductos));
app.use("/api/carts", cartsRouter(listaDeCarts,listaDeProductos));
app.use("/index", indexRouter)    


app.listen(port , () =>{
  console.log(`Server running at por ${port}`);
})

