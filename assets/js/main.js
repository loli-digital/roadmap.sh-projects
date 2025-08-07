document.addEventListener("DOMContentLoaded", () => {

    const textarea = document.querySelector("#message");
    const contador = document.querySelector(".contador");
    const limiteCaracteres = 250;

    textarea.addEventListener('input', () => {
        let texto = textarea.value;

        // Si supera el límite, recortar y actualizar el textarea
        if (texto.length > limiteCaracteres) {
            texto = texto.substring(0, limiteCaracteres);
            textarea.value = texto;
        }

        // Actualizar el contador visual
        const totalCaracteres = texto.length;
        contador.textContent = `${totalCaracteres}/${limiteCaracteres}`;

        // Cambiar color del contador si se llega al límite
        if(totalCaracteres >= limiteCaracteres){
            contador.style.color = "red";
            textarea.classList.add("textareaRojo");

        }else {
            contador.style.color = "";
            textarea.classList.remove("textareaRojo");
        }
    });

});