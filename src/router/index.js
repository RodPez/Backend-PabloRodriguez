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
const cookiesController = require("../cookies/controller.cookies");
const usersController = require("../users/controller.users")
const authController = require("../auth/controller.auth")

const router = app =>{
    app.use("/", homeRouter(listaDeProductos)); //Este endpoint trabaja solamente con fs
    app.use("/api/products" ,productsRouter(listaDeProductos)); //Este endpoint trabaja solamente con fs
    app.use("/api/carts", cartsRouter(listaDeCarts,listaDeProductos)); //Este endpoint trabaja solamente con fs
    app.use("/realtimeproducts", realTimeProductsRouter);//Este endpoint trabaja solamente con fs
    app.use("/products", productsController); //Este endpoint trabaja con mongoose y fs
    app.use("/carts", cartsController);//Este endpoint trabaja con mongoose y fs
    app.use("/chat", templatesController);//Este endpoint trabaja con mongoose y fs
    app.use("/cookies" , cookiesController);
    app.use("/users", usersController)
    app.use("/auth", authController)
    
}

module.exports = router;