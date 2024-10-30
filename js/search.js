const searchInput = document.querySelector('#search');
const result = document.querySelector('#encontrado');
let timeoutId;

searchInput.addEventListener('input', function() {
    result.innerHTML = `<div class="caja">
                <img src="../public/loguito.svg" alt="Logo">
                <h4 class="lato-bold">Cargando...</h4>
            </div>`
  clearTimeout(timeoutId);

  timeoutId = setTimeout(function() {
    if (searchInput.value.trim() == '') {
        result.innerHTML = `<h3 class="subtitulo lato-bold">No hay usuarios encontrados...</h3><div class="boton">
                <a href="./index.html" class="loto-bold back">Regresar</a>
            </div>`
        return
    }
   
    fetch(`https://api.github.com/users/${searchInput.value}`)
    .then(response => response.json())
    .then(data => {
        if (data.login == undefined) {
            return result.innerHTML = `<h3 class="subtitulo lato-bold">Este usuario no existe...</h3><div class="boton">
            <a href="./index.html" class="loto-bold back">Regresar</a>
        </div>`
        }
        localStorage.setItem("user", JSON.stringify(data.login));
        result.innerHTML = `<article class="card">
                <figure class="card-image">
                    <img src="${data.avatar_url}" alt="avatar">
                </figure>
                <div class="card-info">
                    <h4 class="playfair-black">${data.name}</h4>
                    <h5 class="lato-bold">@${data.login}</h5>
                    <h6 class="lato-regular"><b class="lato-bold">Empresa:</b> ${data.company == null ? "No tiene." : data.company}</h6>
                    <h6 class="lato-regular"><b class="lato-bold">Ubicación:</b> ${data.location == null ? "No tiene." : data.location}</h6>
                    <p class="lato-regular"><b class="lato-bold">Biografía:</b> ${data.bio == null ? "No tiene." : data.bio}</p>
                </div>
                <div class="card-stats">
                    <div class="stat">
                        <h5 class="lato-bold">Repositorios</h5>
                        <p class="lato-regular">${data.public_repos}</p>
                    </div>
                    <div class="stat">
                        <h5 class="lato-bold">Seguidores</h5>
                        <p class="lato-regular">${data.followers}</p>
                    </div>
                    <div class="stat">
                        <h5 class="lato-bold">Siguiendo</h5>
                        <p class="lato-regular">${data.following}</p>
                    </div>
                </div>
                <div class="card-links">
                    <a href="${data.html_url}" class="button lato-bold">GitHub</a>
                    <a href="${data.blog == "" ? "#search" : data.blog}" class="button lato-bold">Blog</a>
                    <a href="./repositorios.html" class="button lato-bold">Repositorios</a>
                </div>
            </article>
            <div class="boton">
                <a href="./index.html" class="loto-bold back">Regresar</a>
            </div>
            `
    });
    
  }, 1000);
});