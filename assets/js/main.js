document.addEventListener('DOMContentLoaded', () => {

    const dropdown = document.querySelector(".dropdown");
    const menuDesplegable = document.querySelector(".dropdown-header");
    const listaDesplegable = document.querySelector(".dropdown-list");
    const selectedValue = document.querySelector(".selected-value");

    menuDesplegable.addEventListener("click", () => {

        dropdown.classList.toggle("visible");
    });

    listaDesplegable.addEventListener("click", (event) => {

        if (event.target.tagName === 'LI') {
            const selectedOption = event.target;

            selectedValue.textContent = selectedOption.textContent;
            dropdown.classList.remove("visible");
        }
    });

    document.addEventListener('click', (event) => {

        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove("visible");
        }
    });

});