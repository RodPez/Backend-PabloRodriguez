const {Router}= require("express");
const CartsFileManager = require("../dao/CartsFileManager.dao");
const CartsDao = require("../dao/Carts.dao")


const router = Router();
const cartFManager = new CartsFileManager();
const cartsDao = new CartsDao();

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

router.post("/", async (req,res) =>{
    try {
        const newCart = await cartsDao.create({})
        res.status(201).json({message: newCart})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: `No se pudo crear el carrito.`})
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

router.delete("/deleteAll", async (req,res) =>{
    await cartsDao.deleteAll();
    res.json({message:"Se borraron todos los carritos"})
})

module.exports = router;