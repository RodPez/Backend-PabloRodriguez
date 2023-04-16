const {Router} = require("express");
const fs = require("fs");
let productosActuales =[];
const archivo = process.cwd() + "/files/Productos.json"
const router = Router();

router.get("/", (req, res) =>{
    const productosRawData = fs.readFileSync(archivo);
    const productos = JSON.parse(productosRawData);
    productosActuales = [...productos];
    res.render("realTimeProducts.handlebars",{productos})
})

router.post("/", (req, res) =>{
    const productosNuevos = [...productosActuales];
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
   
  
    if (codigoYaIngresado.length === 0 || newProductInfo.code=== "") {
        
        newProductInfo.id = productosNuevos.length + 1;
        newProductInfo.status = true;
        productosNuevos.push(newProductInfo)
        const prodAJson = JSON.stringify(productosNuevos);
        console.log(prodAJson);
        fs.writeFileSync(archivo, prodAJson)
        res.redirect('/realtimeproducts');
    } 
    
})

module.exports = router;
  