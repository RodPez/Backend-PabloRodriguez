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
            res.status(200).json({productos: productosLimitados});
        } catch (error) {
            console.log(`Error al obtener la lista de productos: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
            next(error);
        }
    })

    router.get("/:pid", async (req, res, next) =>{
        try {
            const {pid} = req.params;
            const prodPorId = await listaDeProductos.getProductById(parseInt(pid))
            console.log(prodPorId);
            res.status(200).json({prodPorId}) 
        } catch (error) {
            console.log(`No se encuentra el producto ${error}`);
            res.status(404).json({error: "El producto no se encuentra."})
            next(error);
        }
    })

    router.post("/", async (req, res, next) =>{
        try {
            const {title , description, price, thumbnail, code, stock} = req.body
            const newProductInfo ={
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            await listaDeProductos.addProduct(newProductInfo);
            res.status(201).json({message: "El producto se creo correctamente"})
        } catch (error) {
            console.log(`No se pudo cargar el producto correctamente ${error}`);
            res.status(500).json({error: "No se pudo cargar el producto"})
            next(error);
        }
    })

    router.delete("/:id", async (req, res, next) => {
        try {
            const {id} = req.params;
            await listaDeProductos.deleteProduct(parseInt(id))
            res.status(201).json({message: "El producto fue borrado exitosamente"})
        } catch (error) {
            console.log(`No se pudo borrar el producto o es inexistente ${error}`);
            res.status(500).json({error: "No se pudo borrar el producto"})
            next(error);
        }

    })

    router.put("/:id", async (req, res, next) => {
        try {
            const {id} = req.params;
            const {propiedad, valor} = req.body;
            console.log(propiedad , valor);
            await listaDeProductos.updateProduct(parseInt(id), propiedad, valor);
            res.status(201).json({message: "El producto fue actualizado correctamente"})
        } catch (error) {
            console.log(`No se pudo actualizar el producto correctamente ${error}`);
            res.status(500).json({error: "No se pudo actualizar el producto."})
            next(error)
        }
    })
  

    return router;
}