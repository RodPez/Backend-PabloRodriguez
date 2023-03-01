const fs = require("fs");

//let idGenerado = 0;

class ProductManager {
    constructor(path){
        this.productos =[]
        this.path = path
    }
    
    async getProducts(){
        try {
            const readData =await fs.promises.readFile(this.path, "utf-8")
            const datosParseados = JSON.parse(readData)
            this.productos = datosParseados
            return this.productos          
        } catch (error) {
            console.log(error);
        }
    }

    getProductById(idABuscar){
            const productoConIdBuscado = this.productos.find((p) => p.id === idABuscar);
            const erroMsg = "No existe el producto con ID indicado."
             if (!productoConIdBuscado) {
                return erroMsg;
            } else {
                return productoConIdBuscado;
            }
    }
    
    generarId(){
        const ultimoProd = this.productos[this.productos.length - 1]
        if (!ultimoProd) {
            return 1
        } else {
            return ultimoProd.id + 1
        }
    }
    async addProduct(newProduct){
        try {
            this.getProducts()

            const codigoYaIngresado = this.productos.filter(function(producto){
                return producto.code === newProduct.code
            })
    
            const yaIngresado = "Este producto ya fue ingresado"
            if (codigoYaIngresado.length !== 0) {
                console.log(yaIngresado); //Si el código del producto a ingresar ya existe imprime el mensaje de error detallado.
            }else{
                newProduct.id = this.generarId();
                this.productos.push(newProduct);
            }
            const { title , description, price, thumbnail, code, stock } = newProduct;
            const errorProd = "Faltan datos del producto"
            if (!title ||
                !description ||
                !price ||
                !thumbnail ||
                !code ||
                !stock
                ) {
                    return errorProd; //Se imprime este mensaje si falta algun campo de producto.
            }
            const convertir = this.productos
            const dataJson= JSON.stringify(convertir)
            await fs.promises.writeFile(this.path,dataJson)
        } catch (error) {
            console.log(error);
        }
    }
     
    async updateProduct(id, propACambiar, nuevoValor){
        try {
            this.getProducts();
            const prodAActualizar = this.productos.find(function(producto){
                return producto.id === id;
            });
    
            prodAActualizar[propACambiar] = nuevoValor;
    
            this.productos = this.productos.map(function(producto){
                if (producto.id === prodAActualizar.id){
                    return prodAActualizar;
                }
                return producto;
            });
            const datosActualizados = this.productos
            const actualizadosAJson = JSON.stringify(datosActualizados)
            await fs.promises.writeFile(this.path,actualizadosAJson)
            return datosActualizados;
        } catch (error) {
            console.log(error);
        }
        
    }

    async deleteProduct(idProd, valorCod){
        try {
            this.getProducts();
            const productIndex = this.productos.findIndex(function(producto){
                return producto[idProd] === valorCod;
            });
    
            const errorDelete = "El producto no existe"
            if (productIndex !== -1) {
                this.productos.splice(productIndex,1)
            } else {
                console.log(errorDelete); 
            }
            const productosConProdBorrado = this.productos
            const prodBorradAJson = JSON.stringify(productosConProdBorrado)
            await fs.promises.writeFile(this.path, prodBorradAJson)
            return productosConProdBorrado;
        
        } catch(error) {
            console.log(error);
        }
    }
}
module.exports = ProductManager

