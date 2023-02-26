const ProductManager = require("./class/ProductManager");
const nuevaListaDeProductos = new ProductManager()
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

console.log(nuevaListaDeProductos.getProducts()) //Imprime el estado del arreglo de productos inicializado como vacío.

nuevaListaDeProductos.addProduct(newProduct)
console.log(nuevaListaDeProductos.getProducts());
nuevaListaDeProductos.addProduct(newProduct2)
console.log(nuevaListaDeProductos.getProducts());
//console.log(nuevaListaDeProductos.getProductById(1));
//console.log(nuevaListaDeProductos.getProductById(2));
nuevaListaDeProductos.updateProduct("abc123", "description", "Este es el producto de prueba actualizado")
console.log(nuevaListaDeProductos.getProducts()); 
nuevaListaDeProductos.deleteProduct("code", "abc123" )
nuevaListaDeProductos.deleteProduct("code", "abc678" )


//Imprime el estado final del arreglo de productos, segun la consigna solo con un producto ya que al tratar de ingresar un duplicado descartaria este último.
console.log(nuevaListaDeProductos.getProducts()); 

