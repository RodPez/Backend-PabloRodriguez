const {Router} = require("express");

const router = Router();
const fs = require("fs");

router.get("/", (req, res) =>{
    const productosRawData = fs.readFileSync('./files/Productos.json');
    const productos = JSON.parse(productosRawData);
    res.render("realTimeProducts.handlebars",{productos})
})

module.exports = router;
  