const express = require("express");
const ProductManager = require("../class/ProductManager");
const listaDeProductos = new ProductManager("../files/Productos.json")
listaDeProductos.getProducts();

const app = express();

const port = 3000;

app.get("/products", async (req , res) =>{
    const lista = await listaDeProductos.getProducts()
    const limit = req.query.limit;

    //Se utiliza como condicion que limit sea menor al tamaño del array para que
    //de esa manera se ejecute el slice de ser necesario, caso contrario no realiza dicha accion.
    if (limit < lista.length) {
        const productosLimitados = lista.slice(0 , limit);
        res.json({productos: productosLimitados})
    } else {
        res.json({productos: lista})
    }
})

app.get("/products/:id", async (req , res) =>{
    const id = req.params.id;
    const prodPorId = await listaDeProductos.getProductById(parseInt(id))
    console.log(prodPorId);
    res.json({prodPorId})
})

app.listen(port , () =>{
    console.log(`Server running at por ${port}`);
})