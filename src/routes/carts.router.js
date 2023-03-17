const {Router} = require("express");

const router = Router();

module.exports = (listaDeCarts, listaDeProductos) =>{

    router.get("/", async (req, res) =>{
        try {
            const lista = await listaDeCarts.getCarts() ;
            res.status(200).json({carritos: lista});   
        } catch (error) {
            console.log(`Error al obtener la lista de carritos: ${error}`);
            res.status(500).json({ error: "Error interno del servidor" });
            //next(error);
        }
    })

    router.get("/:cid", async (req, res, next) =>{
        try {
            const {cid} = req.params;
            const cartPorId = await listaDeCarts.getCartById(parseInt(cid))
            res.status(200).json({cartPorId}) 
        } catch (error) {
            console.log(`No se encuentra el carrito ${error}`);
            res.status(404).json({error: "El carrito no se encuentra."})
            next(error);
        }
    })

    router.post("/", async (req, res, next) =>{
        try {
            await listaDeCarts.addCart();
            res.status(201).json({message: "El carrito se creo correctamente"})
        } catch (error) {
            console.log(`No se pudo cargar el carrito correctamente ${error}`);
            res.status(500).json({error: "No se pudo cargar el carrito"})
            next(error);
        }
    })

    router.post("/:cid/product/:pid" , async (req, res , next) =>{
        try {
            const {cid,pid} = req.params
            const prodAAgregar = await listaDeProductos.getProductById(parseInt(pid));
            if (prodAAgregar.stock === 0) {
                res.status(404).json({message: "El producto que desea agregar se encuentra agotado"})
            } else {
                await listaDeCarts.addProductToCart(parseInt(cid),await listaDeProductos.getProducts(),parseInt(pid))
                res.status(201).json({message: "El producto se agrego al carrito exitosamente"})   
            }
        } catch (error) {
            console.log(`No se pudo cargar el producto al carrito correctamente ${error}`);
            res.status(500).json({error: "No se pudo cargar el producto al carrito correctamente"})
            next(error)
        }
    })

    return router;
}