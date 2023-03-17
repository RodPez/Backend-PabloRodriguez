const fs = require("fs")

class CartsManager {
    constructor(path){
        this.carts = []
        this.path = path
    }

    async getCarts(){
        try {
            if (!fs.existsSync(this.path)) {
                return this.carts;
            }else {
                const readData = await fs.promises.readFile(this.path, "utf-8");
                const datosParseados = JSON.parse(readData);
                this.carts = datosParseados;
                return this.carts;          
            }
        } catch (error) {
            return `El archivo no existe: ${error}`;
        }
    }

    getCartById(idABuscar){
        const cartConIdBuscado = this.carts.find((e) => e.id === idABuscar);
        const erroMsg = "No existe el carrito con ID indicado."
         if (!cartConIdBuscado) {
            return erroMsg;
        } else {
            return cartConIdBuscado;
        }
    }

    generarId(){
        const ultimoCart = this.carts[this.carts.length - 1]
        if (!ultimoCart) {
            return 1
        } else {
            return ultimoCart.id + 1
        }
    }

    async addCart(){
        try { 
            
            const initialSize = this.carts.length;
            const newCart = {};
            
            newCart.id = this.generarId();
            newCart.products = [];
            this.carts.push(newCart);
            
            if (this.carts.length > initialSize) {
                const convertir = this.carts
                const dataJson= JSON.stringify(convertir)
                await fs.promises.writeFile(this.path,dataJson)
            }
        } catch (error) {
            return `No se pudo cargar el cart ${error}`;
        }
    }
    
    async addProductToCart(cartId,listaProductos, productId){
        try {
            const cartBuscado = this.carts.find((e) => e.id === cartId);
            const productoBuscado = listaProductos.find((e) => e.id === productId)
            const prodEnCart = cartBuscado.products.find((e) => e.id === productId)
            //El delete en products es cambiar el status a false y poner el stock en 0, este if funciona de controlador si el stock es 0  para que no se cargue nada en el array de producto
            if (productoBuscado.stock === 0) {
                return `No se puede agregar el producto "${productoBuscado.nombre}" al carrito porque su stock es insuficiente.`;
            }else if (prodEnCart && productoBuscado) {
                prodEnCart.cantidad = prodEnCart.cantidad + 1
            }else{
                cartBuscado.products.push({id : productId, cantidad : 1})
            }
            const convertir = this.carts
            const dataJson= JSON.stringify(convertir)
            await fs.promises.writeFile(this.path,dataJson)
            return this.carts
        } catch (error) {
            return `No se pudo cargar el producto al carrito correctamente ${error}`
        }
    }

}

module.exports = CartsManager
