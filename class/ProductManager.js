let idGenerado = 0;
class ProductManager {
    productos  

    constructor(){
        this.productos =[]
    }

    getProducts(){
        return this.productos
    }

    getProductById(idABuscar){
        const productoConIdBuscado = this.productos.filter(function(producto){
            return producto.id === idABuscar
         })
         if (productoConIdBuscado.length !== 0) {
            console.log(productoConIdBuscado);//Imprime un array con  el producto  con el ID buscado en consola. 
        } else {
            console.log("No existe el producto con ID indicado.");
        }
        console.log(productoConIdBuscado);
    }

    addProduct(){
        
        function generarId(){
            idGenerado= idGenerado+ 1;
            return idGenerado;
        }
        
        const newProduct = {
            id: generarId(),
            title: "producto prueba",
            description:"Este es un producto prueba",
            price:200,
            thumbnail:"Sin imagen",
            code:"abc123",
            stock:25
        }
        const codigoYaIngresado = this.productos.filter(function(producto){
            return producto.code === newProduct.code
         })


       if (codigoYaIngresado.length === 0) {
        this.productos.push(newProduct)
        } else {
            console.log("Este producto ya fue ingresado");//Si el código del producto a ingresar ya existe imprime el mensaje de error detallado.
}
 
        console.log(newProduct.id); // Imprime el id incremental automatico que se le dará al nuevo producto ingresado
    }
}

module.exports = ProductManager

