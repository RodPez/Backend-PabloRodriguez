const fs = require("fs");


class ProductManager {
    constructor(path){
        this.productos =[]
        this.path = path
    }


    async getProducts(){
        try {
            if (!fs.existsSync(this.path)) {
                return this.productos;
            }else {
                const readData = await fs.promises.readFile(this.path, "utf-8");
                const datosParseados = JSON.parse(readData);
                this.productos = datosParseados;
                return this.productos;          
            }
        } catch (error) {
            return `El archivo no existe: ${error}`;
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
            const codigoYaIngresado = this.productos.filter(function(producto){
                return producto.code === newProduct.code
            })
            const initialSize = this.productos.length;

            if (codigoYaIngresado.length !== 0) {
                return `Este producto ya fue ingresado`; //Si el código del producto a ingresar ya existe imprime el mensaje de error detallado.
            }else{
                newProduct.id = this.generarId();
                newProduct.status = true; // Se agrega la propiedad status y se le da el valor true ya que debe ser asi por defecto
                this.productos.push(newProduct);
            }
            const { title , description, price, code, stock } = newProduct;
            if (!title ||
                !description ||
                !price ||
                !code ||
                !stock
                ) {
                    return `Faltan datos del producto`; //Se imprime este mensaje si falta algun campo de producto.
            }
            if (this.productos.length > initialSize) {
                const convertir = this.productos
                const dataJson= JSON.stringify(convertir)
                await fs.promises.writeFile(this.path,dataJson)
            }
        } catch (error) {
            return `No se pudo cargar el nuevo producto ${error}`;
        }
    }
     //En el updateProduct no se tiene en cuenta el cambiar la propiedad ID ya que en la consigna decia que era la única propiedad que no se debía cambiar.
    async updateProduct(id, propACambiar, nuevoValor){
        try {
            const prodAActualizar = this.productos.find(function(producto){
                return producto.id === id;
            });
    
            
            const updatedProductos = await Promise.all(this.productos = this.productos.map(async function(producto){
                if (producto.id === prodAActualizar.id && producto[propACambiar] !== nuevoValor && propACambiar !== "id") {
                    prodAActualizar[propACambiar] = nuevoValor;
                    const datosActualizados = this.productos
                    const actualizadosAJson = JSON.stringify(datosActualizados)
                    await fs.promises.writeFile(this.path,actualizadosAJson)
                    return datosActualizados;
                }
                return producto;
            }.bind(this)));
            this.productos = updatedProductos
        } catch (error) {
            return error;
        }
        
    }

    async deleteProduct(idProd){
        try {
            const productABorrar = this.productos.findIndex((p) => p.id === idProd);
             
            if (productABorrar === -1) {
                return `El producto no existe o ya fue borrado : ${null}`; 
            } else {
                this.productos[productABorrar].status = false; //En lugar de realizar el slice abajo comentado se setea el valor de status en false para "borrar" el producto
                this.productos[productABorrar].stock = 0; //Se setea el stock en 0 ya que al borrar el producto no esta disponible.
                //this.productos.splice(productABorrar,1)
                const productosConProdBorrado = this.productos
                const prodBorradAJson = JSON.stringify(productosConProdBorrado)
                await fs.promises.writeFile(this.path, prodBorradAJson)
            }
        } catch(error) {
            return `No se pudo llevar a cabo el borrado ${error}`;
        }
    }
}   
module.exports = ProductManager

