const ProductManager = require("./class/ProductManager");
const nuevaListaDeProductos = new ProductManager("Productos.json")
const newProduct = {
    title: "producto prueba",
    description:"Este es un producto prueba",
    price:200,
    thumbnail: "Sin imagen",
    code:"abc123",
    stock:25
}

const newProduct2 = {
    title: "producto prueba número 2",
    description:"Este es el segundo producto prueba",
    price:100,
    thumbnail: "Sin imagen",
    code:"abc456",
    stock:15
}

const newProduct3 = {
    title: "producto prueba número 2",
    description:"Este es el segundo producto prueba",
    price:100,
    thumbnail: "Sin imagen",
    code:"abc789",
    stock:15
}

const ejecucion= async () =>{
    try {
        console.log(await nuevaListaDeProductos.getProducts()) //Imprime el estado del arreglo de productos inicializado como vacío.
        
        await nuevaListaDeProductos.addProduct(newProduct)
        //console.log(await nuevaListaDeProductos.getProducts());
        await nuevaListaDeProductos.addProduct(newProduct2)
        //console.log(await nuevaListaDeProductos.getProducts());
        await nuevaListaDeProductos.addProduct(newProduct3)
        console.log(await nuevaListaDeProductos.getProducts());
        console.log(await nuevaListaDeProductos.getProductById(1));
        //console.log(await nuevaListaDeProductos.getProductById(2));
        nuevaListaDeProductos.updateProduct(1, "description", "Producto de prueba actualizado")
        console.log(await nuevaListaDeProductos.getProducts()); 
        await nuevaListaDeProductos.deleteProduct("id", 1)
        
        
        
        //Imprime el estado final del arreglo de productos, segun la consigna solo con un producto ya que al tratar de ingresar un duplicado descartaria este último.
        console.log( await nuevaListaDeProductos.getProducts()); 
        
    } catch (error) {
        
    }
}


return ejecucion();
