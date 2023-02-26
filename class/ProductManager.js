let idGenerado = 0;

class ProductManager {
    constructor(){
        this.productos =[]
    }

    getProducts(){
        return this.productos
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

    addProduct(newProduct){

        function generarId(){
            idGenerado= idGenerado+ 1;
            return idGenerado;
        }

        const codigoYaIngresado = this.productos.filter(function(producto){
            return producto.code === newProduct.code
         })

        const yaIngresado = "Este producto ya fue ingresado"
        if (codigoYaIngresado.length !== 0) {
            console.log(yaIngresado); //Si el código del producto a ingresar ya existe imprime el mensaje de error detallado.
        }else{
            newProduct.id = generarId();
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
    }
     
    updateProduct(codigo, propACambiar, nuevoValor){
        const prodAActualizar = this.productos.find(function(producto){
            return producto.code === codigo;
        });

        prodAActualizar[propACambiar] = nuevoValor;

        this.productos = this.productos.map(function(producto){
            if (producto.code === prodAActualizar.code){
                return prodAActualizar;
            }
            return producto;
        });
        return this.productos;
        
    }

    deleteProduct(codProd, valorCod){
        const productIndex = this.productos.findIndex(function(producto){
            return producto[codProd] === valorCod;
        });

        const errorDelete = "El producto no existe"
        if (productIndex !== -1) {
            this.productos.splice(productIndex,1)
        } else {
            console.log(errorDelete); 
        }
        return this.productos;
    }
}

module.exports = ProductManager

