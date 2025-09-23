const inputText = document.querySelector(".input__number");
const fromUnit = document.querySelector(".select__from__unit");
const toUnit = document.querySelector(".select__to__unit");
const btn = document.querySelector(".btn");
const mensaje = document.querySelector(".mensaje");

const redondearResultado = (numero) => {

    if (numero % 1 !== 0) {

        return numero.toFixed(2);

    } else {

        return numero;
    }
}

btn.addEventListener("click", () => {

    const inputValue = inputText.value;
    const inputNumber = parseFloat(inputValue.trim());
    const valueFromUnit = fromUnit.value;
    const valueToUnit = toUnit.value;
    let resultado;

    if (isNaN(inputNumber)) {

        mensaje.textContent = "Introduce un número válido";
        console.log("Error: Por favor, introduce un número válido.");
        return;

    }

    if (valueFromUnit === "default" || valueToUnit === "default") {

        mensaje.textContent = "Selecciona una unidad de temperatura";
        console.log("Selecciona una unidad de temperatura");
        return;

    }

    if (valueFromUnit === valueToUnit) {

        const valorRedondeado = redondearResultado(inputNumber);

        mensaje.textContent = `${valorRedondeado}°${valueFromUnit.charAt(0).toUpperCase()}`;

        return;
    }

    //Operaciones

    if (valueFromUnit === "fahrenheit") {

        if (valueToUnit === "celsius") {

            resultado = (inputNumber - 32) / 1.8;

        } else if (valueToUnit === "kelvin") {

            resultado = (inputNumber - 32) / 1.8 + 273.15;
        }

    } else if (valueFromUnit === "celsius") {

        if (valueToUnit === "fahrenheit") {

            resultado = (1.8 * inputNumber) + 32;

        } else if (valueToUnit === "kelvin") {

            resultado = inputNumber + 273.15;
        }

    } else if (valueFromUnit === "kelvin") {

        if (valueToUnit === "fahrenheit") {

            resultado = (inputNumber - 273.15) * 1.8 + 32;

        } else if (valueToUnit === "celsius") {

            resultado = inputNumber - 273.15;
        }
    }

    const resultadoFinal = redondearResultado(resultado);

    const simboloUnidad = valueToUnit.charAt(0).toUpperCase();

    mensaje.textContent = `${resultadoFinal}°${simboloUnidad}`;
});