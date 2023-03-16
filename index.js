const ProductManager = require("./class/ProductManager");
const nuevaListaDeProductos = new ProductManager("./files/Productos.json")
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
const newProduct4 = {
    title: "producto prueba número 2",
    description:"Este es el segundo producto prueba",
    price:100,
    thumbnail: "Sin imagen",
    code:"abc987",
    stock:15
}
const newProduct5 = {
    title: "producto prueba número 2",
    description:"Este es el segundo producto prueba",
    price:100,
    thumbnail: "Sin imagen",
    code:"abc654",
    stock:15
}
const newProduct6 = {
    title: "producto prueba número 2",
    description:"Este es el segundo producto prueba",
    price:100,
    thumbnail: "Sin imagen",
    code:"abc432",
    stock:15
}

const ejecucion= async () =>{
    try {
        await nuevaListaDeProductos.getProducts() //Imprime el estado del arreglo de productos inicializado como vacío en caso de que no exista o no haya datos en el archivo json, en caso contrario traera y cargara todos los datos que alli se encuentren.
        console.log(nuevaListaDeProductos.productos);
        //await nuevaListaDeProductos.addProduct(newProduct); //Se ejecuta el comando para agregar un producto
        //console.log(await nuevaListaDeProductos.addProduct(newProduct)); // Se utiliza el log para corroborar que es lo que retorna la funcion, en caso de que se haber algun error se retornara el mensaje correspondiente.
        //console.log(nuevaListaDeProductos.productos);
        //await nuevaListaDeProductos.addProduct(newProduct2)
        //console.log(await nuevaListaDeProductos.getProducts());
        //await nuevaListaDeProductos.addProduct(newProduct3)
        //await nuevaListaDeProductos.addProduct(newProduct4)
        //await nuevaListaDeProductos.addProduct(newProduct5)
        //await nuevaListaDeProductos.addProduct(newProduct6)
        //console.log(await nuevaListaDeProductos.getProducts());
        //console.log(await nuevaListaDeProductos.getProductById(1));
        //console.log(await nuevaListaDeProductos.getProductById(2));
        //nuevaListaDeProductos.updateProduct(2, "description", "Producto de prueba 2 actualizado")
        //console.log(await nuevaListaDeProductos.getProducts()); 
        //await nuevaListaDeProductos.deleteProduct(2); 
        
        
        
        //Imprime el estado final del arreglo de productos, segun la consigna solo con un producto ya que al tratar de ingresar un duplicado descartaria este último.
       console.log( await nuevaListaDeProductos.getProducts()); 
        
    } catch (error) {
        console.log("Problemas en el codigo",error);
    }
}


ejecucion();
