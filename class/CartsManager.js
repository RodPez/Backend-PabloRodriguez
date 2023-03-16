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
        const erroMsg = "No existe el producto con ID indicado."
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

    async addCart(newCart){
        try { 
            
            const initialSize = this.carts.length;

            
            newCart.id = this.generarId();
            this.carts.push(newCart);
            
            if (this.carts.length > initialSize) {
                const convertir = this.productos
                const dataJson= JSON.stringify(convertir)
                await fs.promises.writeFile(this.path,dataJson)
            }
        } catch (error) {
            return `No se pudo cargar el cart ${error}`;
        }
    }

}

module.exports = CartsManager