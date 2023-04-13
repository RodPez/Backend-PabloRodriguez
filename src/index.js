const app = require ("./app");
const {port} = require("./config/app.config");
const {Server} = require("socket.io");
const MessagesDao = require("./dao/Messages.dao");

const messagesDao = new MessagesDao();

const cargarMessages= async () =>{
  return await messagesDao.findAll();
}

const httpServer = app.listen(port, () =>{
    console.log(`Server running at port ${port}`);
})

const io = new Server(httpServer);

let producto= {}

io.on("connection", socket =>{
  console.log( `Cliente conectado con id: ${socket.id}` );

  socket.on('formulario-enviado', function(formData){
    producto = JSON.parse(formData)
    //console.log(producto);
    io.emit("agregarProducto", producto)
  });

  socket.on("newUser",async (user) =>{
    socket.broadcast.emit("userConnected", user)
    const messages = await cargarMessages();
    socket.emit("messageLogs", messages)
  })

  socket.on("message", async (data) =>{
    await messagesDao.create(data)
    const messages = await cargarMessages();
    io.emit("messageLogs",  messages)
  })

})

