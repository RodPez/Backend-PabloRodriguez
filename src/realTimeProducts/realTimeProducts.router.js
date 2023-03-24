const {Router} = require("express");
const fs = require("fs");
let productosActuales =[];
const archivo = "./files/Productos.json"
const router = Router();

router.get("/", (req, res) =>{
    const productosRawData = fs.readFileSync(archivo);
    const productos = JSON.parse(productosRawData);
    productosActuales = [...productos]
    console.log(productosActuales);
    res.render("realTimeProducts.handlebars",{productos})
})

router.post("/", (req, res) =>{
    const {title , description, price, thumbnail, code, stock} = req.body
    const newProductInfo ={
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    }
    const codigoYaIngresado = productosActuales.filter(function(producto){
        return producto.code === newProductInfo.code
    })
    const ultimoEnArray = productosActuales.length - 1
    if (codigoYaIngresado.length === 0) {
        const productosNuevos = [...productosActuales];
        newProductInfo.id = productosActuales[ultimoEnArray].id + 1;
        newProductInfo.status = true;
        productosNuevos.push(newProductInfo)
        console.log(productosNuevos);
        const prodAJson = JSON.stringify(productosNuevos);
        console.log(prodAJson);
        fs.writeFileSync(archivo, prodAJson)
        res.redirect('/realtimeproducts');
    } 
    
})

module.exports = router;
  