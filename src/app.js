const express = require("express");
const ProductManager = require( "../class/ProductManager")
const listaDeProductos = new ProductManager("../files/Productos.json")
const productsRouter = require("./routes/products.router");
const cartsRouter = require("./routes/carts.router")


const app = express();

const port = 8080;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const startServer = async (listaDeProductos) => {
    try {
    
      const routerProd = await productsRouter(listaDeProductos);
      
      app.use("/api/products" ,routerProd);
      app.use("/api/carts", cartsRouter)    
          
      app.listen(port , () =>{
          console.log(`Server running at por ${port}`);
      })
      
    } catch (error) {
      console.log(`Error al iniciar el servidor: ${error}`);
    }
  };
  
 startServer(listaDeProductos);    



