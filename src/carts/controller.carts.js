const {Router}= require("express");
const CartsDao = require("../dao/Carts.dao");
const ProductsDao = require("../dao/Products.dao");
const FilesDao = require("../dao/Files.dao");


const router = Router();
const filesDao = new FilesDao("Carritos.json");
const cartsDao = new CartsDao();
const productsDao = new ProductsDao();

router.get("/loadCarts", async (req,res) =>{
    try {
        const carts = await filesDao.getItems();
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

router.put("/:cid" , async (req, res , next) =>{
    try {
        const {cid} = req.params
        const {product,cantidad} = req.body;
        const cant = cantidad;
        const carrito = await cartsDao.findOne(cid);
        
        if (!carrito.products) {
            carrito.products = [];
        }

        const productoExistente = carrito.products.find(producto => producto.product._id.toString() === product.toString());
        
        
        if (!productoExistente ) {
            carrito.products.push({product, cantidad: cant});
            await cartsDao.update({_id:cid}, {products: carrito.products})
            res.status(201).json({message: "El producto se agrego al carrito exitosamente"})   
        } else {
            res.status(404).json({message: "El producto que desea agregar se encuentra agotado o ya esta ingresado"})
        }
    } catch (error) {
        console.log(`No se pudo cargar el producto al carrito correctamente ${error}`);
        res.status(500).json({error: "No se pudo cargar el producto al carrito correctamente"})
        next(error)
    }
})

router.put("/:cid/products/:pid" , async (req, res , next) =>{
    try {
        const {cid, pid} = req.params
        const {cantidad} = req.body;
        const cant = cantidad;
        const carrito = await cartsDao.findOne(cid);
        console.log(carrito);
        if (carrito) {
            const productIndex = carrito.products.findIndex(producto => producto.product._id.toString() === pid.toString());
            console.log(productIndex);
            if (productIndex !== -1) {
                carrito.products[productIndex].cantidad += cant;
                await cartsDao.update({_id:cid},  { products: carrito.products })
                res.status(201).json({message: "El producto se modifico exitosamente"})   
            } else {
                res.status(404).json({message: "El producto que desea agregar se encuentra agotado o no esta ingresado"})
            }
        }else{
            res.status(404).json({message: "No se pudo encontrar el carrito especificado"})
        }
        
        
    } catch (error) {
        console.log(`No se pudo cargar el producto al carrito correctamente ${error}`);
        res.status(500).json({error: "No se pudo modificar el producto del carrito correctamente"})
        next(error)
    }
})

router.delete("/:cid/products/:pid" , async (req, res , next) =>{
    try {
        const {cid, pid} = req.params
        const carrito = await cartsDao.findOne(cid);
        console.log(carrito);
        if (carrito) {
            const productIndex = carrito.products.findIndex(producto => producto.product._id.toString() === pid.toString());
            console.log(productIndex);
            if (productIndex !== -1) {
                carrito.products.splice(productIndex,1);
                await cartsDao.update({_id:cid},  { products: carrito.products })
                res.status(201).json({message: "El producto se elimino exitosamente"})   
            } else {
                res.status(404).json({message: "El producto que desea eliminar  no esta ingresado"})
            }
        }else{
            res.status(404).json({message: "No se pudo encontrar el carrito especificado"})
        }
        
        
    } catch (error) {
        console.log(`No se pudo eliminar el producto al carrito correctamente ${error}`);
        res.status(500).json({error: "No se pudo eliminar el producto del carrito correctamente"})
        next(error)
    }
})


router.delete("/:id", async (req, res) =>{
    try {
        const {id} =req.params;
        const carrito = await cartsDao.findOne(id);
        console.log(carrito);
        if (carrito) {
            carrito.products = [];
            await cartsDao.update({_id:id},  { products: carrito.products })
            res.status(201).json({message: "Los productos se eliminaron exitosamente"})   
        }else{
            res.status(404).json({message: "No se pudo encontrar el carrito especificado"})
        }
        
        
    } catch (error) {
        console.log(`No se pudieron eliminar los productos al carrito correctamente ${error}`);
        res.status(500).json({error: "No se pudieron eliminar los productos del carrito correctamente"})
        next(error)
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