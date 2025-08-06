document.addEventListener("DOMContentLoaded", () => {

    const { DateTime } = luxon;

    const btnCalculate = document.querySelector("#btnCalculate");

    btnCalculate.addEventListener("click", () => {
        
        //Así se evita que recargue la web automáticamente, al ser un formulario
        event.preventDefault();

        const input = document.querySelector("#inputFecha").value.trim();
        const resultado = document.querySelector(".resultado");

        //Validamos el formato
        const formatoValido = /^\d{2}-\d{2}-\d{4}$/;
        if (!formatoValido.test(input)) {
            resultado.textContent = "Formato inválido. Usa DD-MM-AAAA.";
            return;
        }

        //Validamos si la fecha es actual
        const nacimiento = DateTime.fromFormat(input, "dd-MM-yyyy");
        const ahora = DateTime.now();

        if (!nacimiento.isValid || nacimiento > ahora) {
            resultado.textContent = "Fecha no válida o futura.";
            return;
        }

        //Mostramos en el HTML el resultado
        const edad = ahora.diff(nacimiento, ["years", "months", "days"]).toObject();

        resultado.textContent = `Tienes ${Math.floor(edad.years)} años, ${Math.floor(edad.months)} meses y ${Math.floor(edad.days)} días.`;
    });

});