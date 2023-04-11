const app = require ("./app");
const {port} = require("./config/app.config");
const {Server} = require("socket.io");


const httpServer = app.listen(port, () =>{
    console.log(`Server running at port ${port}`);
})

const io = new Server(httpServer);

let producto= {}

io.on("connection", socket =>{
  console.log("Socket conectado");

  socket.on('formulario-enviado', function(formData){
    producto = JSON.parse(formData)
    //console.log(producto);
    io.emit("agregarProducto", producto)
  });

})

