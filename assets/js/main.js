const contenedor = document.querySelectorAll(".contenedor");

for (let i = 0; i < contenedor.length; i++) {
    contenedor[i].addEventListener('click', function () {
        this.classList.toggle('activa')
    })
}