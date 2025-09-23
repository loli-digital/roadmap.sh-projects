document.addEventListener("DOMContentLoaded", () => {

    const select = document.querySelector(".select__language");
    const layoutMensaje = document.querySelector(".layout__mensaje");
    const mensaje = document.querySelector(".mensaje");

    const lenguajesValidos = [
        "javascript", "python", "java", "c++", "c#", "go", "ruby", "php", "typescript",
        "swift", "kotlin", "rust", "scala", "perl", "haskell", "lua", "dart", "elixir",
        "r", "objective-c", "shell", "powershell", "html", "css"
    ];


    async function mostrarLenguajes() {

        try {
            const response = await fetch("https://raw.githubusercontent.com/kamranahmedse/githunt/master/src/components/filters/language-filter/languages.json");

            const data = await response.json();

            select.innerHTML = "";

            const defaultOption = document.createElement("option");
            defaultOption.value = "default";
            defaultOption.textContent = "Selecciona un lenguaje";
            select.appendChild(defaultOption);

            data.forEach(language => {
                const valor = language.value.toLowerCase();
                if (!lenguajesValidos.includes(valor)) return;

                const option = document.createElement("option");
                option.value = valor;
                if (["css", "html", "php"].includes(valor)) {
                    option.textContent = valor.toUpperCase();
                } else {
                    option.textContent = valor.charAt(0).toUpperCase() + valor.slice(1);
                }

                select.appendChild(option);
            });

            mensaje.textContent = "Por favor, selecciona un lenguaje";

        } catch (error) {

            mensaje.textContent = "Error en la búsqueda de lenguajes";
            layoutMensaje.style.backgroundColor = "#ff8484";
        }
    }

    select.addEventListener("change", async () => {

        [...layoutMensaje.children].forEach(child => {
            if (!child.classList.contains("mensaje")) {
                layoutMensaje.removeChild(child);
            }
        });

        const lenguajeSeleccionado = select.value;

        if (lenguajeSeleccionado !== "default") {

            mensaje.textContent = "Buscando repositorio aleatorio...";

            try {

                const response = await fetch(`https://api.github.com/search/repositories?q=language:${lenguajeSeleccionado}&sort=stars&order=desc&per_page=30`, {
                    headers: {
                        "User-Agent": "loli-digital"
                    }
                });

                const result = await response.json();

                if (!result.items || !Array.isArray(result.items)) {
                    mensaje.textContent = "Error al obtener repositorios. Inténtalo de nuevo más tarde.";
                    layoutMensaje.style.backgroundColor = "#ff8484";
                    return;
                }

                const repos = result.items;

                if (repos.length === 0) {
                    mensaje.textContent = `No se encontraron repositorios en ${lenguajeSeleccionado}`;
                    layoutMensaje.style.backgroundColor = "#ff8484";
                    return;
                }


                [...layoutMensaje.children].forEach(child => {
                    if (!child.classList.contains("mensaje")) {
                        layoutMensaje.removeChild(child);
                    }
                });

                mensaje.textContent = "Buscando repositorio aleatorio...";

                mostrarDatos(repos);

                mensaje.textContent = "";

                function mostrarDatos() {

                    mensaje.textContent = "";

                    const randomRepo = repos[Math.floor(Math.random() * repos.length)];

                    // Nombre del proyecto
                    const nombre = document.createElement("h2");
                    nombre.classList.add("repo__name");
                    nombre.textContent = randomRepo.name;
                    layoutMensaje.appendChild(nombre);

                    // Descripción
                    const descripcion = document.createElement("p");
                    descripcion.classList.add("repo__description");
                    descripcion.textContent = randomRepo.description;
                    layoutMensaje.appendChild(descripcion);

                    // div para englobar lenguaje, estrellas, fork e issues
                    const divEstadisticas = document.createElement("div");
                    divEstadisticas.classList.add("repo__stadistics");
                    layoutMensaje.appendChild(divEstadisticas);

                    // Lenguaje usado
                    const lenguaje = document.createElement("p");
                    lenguaje.classList.add("stadistics__language");
                    lenguaje.textContent = randomRepo.language;
                    layoutMensaje.appendChild(lenguaje);
                    divEstadisticas.appendChild(lenguaje);

                    // Estrellas
                    const estrellas = document.createElement("p");
                    estrellas.classList.add("stadistics__stars");

                    // Crear un span para insertar el svg
                    const spanEstrellas = document.createElement("span");
                    estrellas.appendChild(spanEstrellas);

                    // Insertar svg de estrellas
                    const svgEstrellas = document.createElement("img");
                    svgEstrellas.src = "assets/img/star-solid-full.svg";
                    svgEstrellas.classList.add("svg__estrellas");
                    spanEstrellas.appendChild(svgEstrellas);

                    // Lo siguiente con estrellas
                    const textNodeStars = document.createTextNode(randomRepo.stargazers_count);
                    estrellas.appendChild(textNodeStars);
                    divEstadisticas.appendChild(estrellas);

                    // Fork
                    const fork = document.createElement("p");
                    fork.classList.add("stadistics__fork");

                    const spanFork = document.createElement("span");
                    fork.appendChild(spanFork);

                    const svgFork = document.createElement("img");
                    svgFork.src = "assets/img/code-fork-solid-full.svg";
                    svgFork.classList.add("svg__fork");
                    spanFork.appendChild(svgFork);

                    const textNodeFork = document.createTextNode(randomRepo.forks_count);
                    fork.appendChild(textNodeFork);
                    divEstadisticas.appendChild(fork);

                    // Issues
                    const issues = document.createElement("p");
                    issues.classList.add("stadistics__issues");

                    const spanIssues = document.createElement("span");
                    issues.appendChild(spanIssues);

                    const svgIssues = document.createElement("img");
                    svgIssues.src = "assets/img/circle-info-regular-full.svg";
                    svgIssues.classList.add("svg__issues");
                    spanIssues.appendChild(svgIssues);

                    const textNodeIssues = document.createTextNode(randomRepo.open_issues_count);
                    issues.appendChild(textNodeIssues);
                    divEstadisticas.appendChild(issues);

                    //URL repo                    
                    const parrafoURL = document.createElement("p");
                    parrafoURL.classList.add("stadistics__url");

                    const urlRepo = document.createElement("a");
                    urlRepo.classList.add("url__repo");
                    urlRepo.href = randomRepo.html_url;
                    urlRepo.target = "_blank";
                    urlRepo.rel = "noopener noreferrer";

                    const svgURL = document.createElement("img");
                    svgURL.src = "assets/img/github.svg";
                    svgURL.classList.add("svg__url");
                    urlRepo.appendChild(svgURL);

                    const textoURL = document.createTextNode(" Ver repo");
                    urlRepo.appendChild(textoURL);

                    parrafoURL.appendChild(urlRepo);
                    divEstadisticas.appendChild(parrafoURL);
                }

                // Creación de botón de refrescar
                const btnRefresh = document.createElement("button");
                btnRefresh.classList.add("btn__refresh");
                btnRefresh.textContent = "🔄 Actualizar";
                layoutMensaje.appendChild(btnRefresh);

                btnRefresh.addEventListener("click", () => {

                    [...layoutMensaje.children].forEach(child => {
                        if (!child.classList.contains("mensaje")) {
                            layoutMensaje.removeChild(child);
                        }
                    });
                    mensaje.textContent = "Buscando repositorio aleatorio...";

                    mostrarDatos();

                    layoutMensaje.appendChild(btnRefresh);

                });

            } catch (error) {
                mensaje.textContent = "Error en la búsqueda de repositorio";
                layoutMensaje.style.backgroundColor = "#ff8484";
                console.error("Error en la búsqueda de repositorio:", error);
            }

        } else {
            mensaje.textContent = "Selecciona tu lenguaje";
        }
    });

    mostrarLenguajes();

});