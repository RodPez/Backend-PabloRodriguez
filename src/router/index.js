const ProductManager = require( "../../class/ProductManager");
const CartsManager = require("../../class/CartsManager");
const pathCarts = "./files/Carritos.json";
const pathProd = "./files/Productos.json";
const listaDeProductos =  new ProductManager(pathProd);
const listaDeCarts = new CartsManager(pathCarts);
const productsRouter = require("../products/products.router");
const productsController = require("../products/controller.products")
const cartsRouter = require("../carts/carts.router")
const cartsController = require("../carts/controller.carts")
const homeRouter = require("../inicio/home.router")
const realTimeProductsRouter = require("../realTimeProducts/realTimeProducts.router")
const templatesController = require("../templates/controller.templates")

const router = app =>{
    app.use("/", homeRouter(listaDeProductos));
    app.use("/api/products" ,productsRouter(listaDeProductos));
    app.use("/api/carts", cartsRouter(listaDeCarts,listaDeProductos));
    app.use("/realtimeproducts", realTimeProductsRouter);
    app.use("/products", productsController);
    app.use("/carts", cartsController);
    app.use("/chat", templatesController);
    
}

module.exports = router;