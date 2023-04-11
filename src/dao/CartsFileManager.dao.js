const fs = require("fs");

class CartsFileManager {
    carts= [];
    constructor() {}

    async loadCarts(){
        if (fs.existsSync(process.cwd() + "/files/Carritos.json")) {
            const data = await fs.promises.readFile(process.cwd() + "/files/Carritos.json");
            const newCarts = JSON.parse(data);
            return newCarts
        }
        return "El archivo no existe."
    }

    async saveCarts(){
        await fs.promises.writeFile()
    }
}

module.exports = CartsFileManager;