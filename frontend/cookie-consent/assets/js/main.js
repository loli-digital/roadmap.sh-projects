document.addEventListener('DOMContentLoaded', function () {

    const bannerCookies = document.querySelector('.banner-cookies');
    const btnCookies = document.querySelector('#btn-cookies');

    //Verificamos si se han aceptado las cookies
    if (!localStorage.getItem('cookiesAceptadas')) {
        bannerCookies.classList.add('visible');
    }

    //Añadimos funcionalidad al hacer click en el botón "Aceptar cookies"
    btnCookies.addEventListener("click", function () {
        localStorage.setItem('cookiesAceptadas', 'true');
        bannerCookies.classList.remove('visible');
    });

});