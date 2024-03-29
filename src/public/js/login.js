const form = document.getElementById("loginForm")

form.addEventListener("submit", e =>{
    e.preventDefault()

    const data = new FormData(form)
    const obj = {}

    data.forEach((value,key) => (obj[key] = value))

    const url = "/auth"
    const headers = {
        "Content-Type": "application/json"
    }

    const method = "POST"
    const body = JSON.stringify(obj)

    fetch(url, {
        headers,
        method,
        body
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            window.location.href = "/"
        } else {
            console.log(data.error)
        }
    })
    .catch(error => console.log(error))
})