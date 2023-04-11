const {Router}= require("express");
const ProductsFileManager = require("../dao/ProductsFileManager.dao");
const ProductsDao = require("../dao/Products.dao");

const router = Router();
const productsFManager = new ProductsFileManager();
const productsDao = new ProductsDao();

router.get("/loadProducts", async (req,res) =>{
    try {
        const products = await productsFManager.loadProducts();
        console.log(products);
        const newProducts = await productsDao.createMany(products);
        console.log(newProducts);
        res.json({message: newProducts})
    } catch (error) {
        res.json({error})
    }
})

router.get("/", async (req, res) =>{
    try {
        const products = await productsDao.findAll({status:true})
        res.status(200).json({message: products})
        
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.get("/:id", async (req,res) =>{
    try {
        const {id} =req.params;
        const productFinded = await productsDao.findOne(id)
        res.status(200).json({message: productFinded})
    } catch (error) {
        res.json(error)
    }
})

router.post("/", async (req,res) =>{
    try {
        const {title,description,price,thumbnail,code,stock} = req.body;
        const productInfo = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }
        const newProduct = await productsDao.create(productInfo)
        res.status(201).json({message: newProduct})
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            res.status(400).json({error: `El producto ya existe`});
        }
    }
})

router.put("/:id", async (req, res) =>{
    try {
        const {id} =req.params;
        const {title,description,price,thumbnail,code,stock} = req.body;
        const updateProductInfo = {
            title,
            description,
            price,thumbnail,
            code,
            stock
        }
        const updateProduct = await productsDao.update({_id:id}, updateProductInfo)
        res.status(200).json({message: updateProduct})
    } catch (error) {
        res.json(error.message)
    }
})

router.delete("/:id", async (req, res) =>{
    try {
        const {id} =req.params;
        const deleteProduct = await productsDao.update({_id:id},{status:false})
        res.status(200).json({message: deleteProduct})
    } catch (error) {
        res.json(error)
    }
})

module.exports = router;