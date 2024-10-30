let user = JSON.parse(localStorage.getItem("user"));

function cargarRepos() {
    const lista = document.getElementById('#lista');
    let contenido = ``
    fetch(`https://api.github.com/users/${user}/repos`)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            contenido = contenido + `<li class="card">
                        <h4 class="lato-black">${data[i].name}</h4>
                        <h5 class="lato-bold">${data[i].language}</h5>
                        <p class="lato-regular"><b class="lato-bold">Descripcion: </b>${data[i].description	}</p>
                        <a class="lato-regular boton" href="${data[i].html_url}">Visitarlo</a>
                    </li>`
        }
        console.log(contenido)
        lista.innerHTML = contenido
    });
}

cargarRepos()