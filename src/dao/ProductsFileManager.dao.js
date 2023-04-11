const fs = require("fs");

class ProductsFileManager {
    products= [];
    constructor() {}

    async loadProducts(){
        if (fs.existsSync(process.cwd() + "/files/Productos.json")) {
            const data = await fs.promises.readFile(process.cwd() + "/files/Productos.json");
            const newProducts = JSON.parse(data);
            return newProducts
        }
        return "El archivo no existe."
    }

    async saveProducts(){
        await fs.promises.writeFile()
    }
}

module.exports = ProductsFileManager;