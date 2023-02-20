const ProductManager = require("./class/ProductManager");

const nuevaListaDeProductos = new ProductManager()


console.log(nuevaListaDeProductos.getProducts()) //Imprime el estado del arreglo de productos inicializado como vacío.

nuevaListaDeProductos.addProduct()
nuevaListaDeProductos.addProduct()
nuevaListaDeProductos.getProductById(1)
nuevaListaDeProductos.getProductById(2)


//Imprime el estado final del arreglo de productos, segun la consigna solo con un producto ya que al tratar de ingresar un duplicado descartaria este último.
console.log(nuevaListaDeProductos); 

