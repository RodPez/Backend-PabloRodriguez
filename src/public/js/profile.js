const button = document.getElementById("logout");

button.addEventListener("click", e =>{
    e.preventDefault()

    window.location.href = '/auth/logout';
    })