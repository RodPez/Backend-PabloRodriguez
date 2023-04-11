const {Router}= require("express");
const CartsFileManager = require("../dao/CartsFileManager.dao");
const CartsDao = require("../dao/Carts.dao");
const ProductsDao = require("../dao/Products.dao");


const router = Router();
const cartFManager = new CartsFileManager();
const cartsDao = new CartsDao();
const productsDao = new ProductsDao();

router.get("/loadCarts", async (req,res) =>{
    try {
        const carts = await cartFManager.loadCarts();
        const newCarts = await cartsDao.createMany(carts);
        res.json({message: newCarts})
    } catch (error) {
        res.json({error})
    }
})

router.get("/", async (req, res) =>{
    try {
        const carts = await cartsDao.findAll()
        res.status(200).json({message: carts})
        
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.get("/:id", async (req,res) =>{
    try {
        const {id} =req.params;
        const cartFinded = await cartsDao.findOne(id)
        res.status(200).json({message: cartFinded})
    } catch (error) {
        res.json(error)
    }
})

router.post("/", async (req,res) =>{
    try {
        const newCart = await cartsDao.create({})
        res.status(201).json({message: newCart})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: `No se pudo crear el carrito.`})
    }
})

router.post("/:cid/product/:pid" , async (req, res , next) =>{
    try {
        const {cid,pid} = req.params
        const {cantidad} = req.body;
        const cant = cantidad;
        const carrito = await cartsDao.findOne(cid);
        
        if (!carrito.products) {
            carrito.products = [];
        }
        const productoExistente = carrito.products.find(producto => producto.id === pid);
        const prodAAgregar = await productsDao.findOne(pid);
        if (productoExistente && prodAAgregar.stock >= cant) {
            productoExistente.cantidad += cant;
        } else {
            
            if (prodAAgregar.stock === 0) {
                res.status(404).json({message: "El producto que desea agregar se encuentra agotado"})
            } else {
                carrito.products.push({id:pid, cantidad: cant});
                console.log(carrito.products);
            }
        }
        await cartsDao.update({_id:cid}, {products: carrito.products})
        res.status(201).json({message: "El producto se agrego al carrito exitosamente"})   
    } catch (error) {
        console.log(`No se pudo cargar el producto al carrito correctamente ${error}`);
        res.status(500).json({error: "No se pudo cargar el producto al carrito correctamente"})
        next(error)
    }
})


router.delete("/:id", async (req, res) =>{
    try {
        const {id} =req.params;
        const deleteCart = await cartsDao.update({_id:id},{status:false})
        res.status(200).json({message: deleteCart})
    } catch (error) {
        res.json(error)
    }
})

router.delete("/delete/all", async (req,res) =>{
    try {
        await cartsDao.deleteAll({});
        res.json({message:"Se borraron todos los carritos"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error al borrar los carritos"})
    }
})


module.exports = router;