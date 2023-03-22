const { Router } = require("express");

const router = Router();


module.exports = (listaDeProductos) => {
    
    router.get("/", async (req, res, next) =>{
        try {
            const lista = await listaDeProductos.getProducts();
            console.log(await listaDeProductos.getProducts());
            console.log(lista);
            const limit = parseInt(req.query.limit) || lista.length;
            const productosLimitados = lista.slice(0, limit);
            res.status(200).render("home.handlebars",{productos: productosLimitados, title: "Home"})   
        } catch (error) {
            console.log(`Error al obtener la lista de productos: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
            next(error);
        }
    })

    return router;
}