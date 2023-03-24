const socket =io();

const formulario = document.getElementById('producto');
const inputs = form.querySelectorAll('input');

formulario.addEventListener('submit', (event) => {
    event.preventDefault();
 
    const formData = {}; 

  inputs.forEach((input) => {
    formData[input.name] = input.value; 
  });

  fetch('/realtimeproducts', { 
    method: 'POST',
    body: JSON.stringify(formData), 
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  });

  socket.emit('formulario-enviado', formData)






