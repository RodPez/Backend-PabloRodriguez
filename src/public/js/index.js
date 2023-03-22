const socket =io();

const formulario = document.getElementById('producto');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(formulario); 
    const formDataJson = JSON.stringify(Object.fromEntries(formData)); 
    
    socket.emit('formulario-enviado', formDataJson); 
  });

  socket.on("agregarProducto", producto => {
    crearTarjeta(producto);
  })

  function crearTarjeta(prod) {
    
    const tarjetaHtml = document.createElement('div');
    tarjetaHtml.classList.add('card', 'text-center', 'm-2',  'text-bg-secondary', "col-sm-3");
    tarjetaHtml.innerHTML = `
      <h2>${prod.title}</h2>
      <p>${prod.price}</p>
      <p>${prod.description}</p>
      <p>${prod.thumbnail} </p>
      <p>${prod.stock} </p>
    `;
    
    
    const contenedorTarjetas = document.getElementById('contenedor-cards');
    contenedorTarjetas.appendChild(tarjetaHtml);
  }