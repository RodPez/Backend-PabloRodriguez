const ProductManager = require( "../../class/ProductManager");
const CartsManager = require("../../class/CartsManager");
const pathCarts = "./files/Carritos.json";
const pathProd = "./files/Productos.json";
const listaDeProductos =  new ProductManager(pathProd);
const listaDeCarts = new CartsManager(pathCarts);
const productsRouter = require("../products/products.router");
const cartsRouter = require("../carts/carts.router")
const homeRouter = require("../inicio/home.router")
const realTimeProductsRouter = require("../realTimeProducts/realTimeProducts.router")

const router = app =>{
    app.use("/", homeRouter(listaDeProductos));
    app.use("/api/products" ,productsRouter(listaDeProductos));
    app.use("/api/carts", cartsRouter(listaDeCarts,listaDeProductos));
    app.use("/realtimeproducts", realTimeProductsRouter)
    
}

module.exports = router;