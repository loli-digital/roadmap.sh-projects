document.addEventListener("DOMContentLoaded", () => {
    const resultadoDiv = document.querySelector(".resultado");
    const inputCiudad = document.querySelector(".input-ciudad");
    const btn = document.querySelector(".btn-buscar");
    const mensaje = document.querySelector(".mensaje");
    const listaCiudades = document.querySelector(".lista-ciudades");

    const ciudad = document.querySelector(".ciudad");
    const tipoClima = document.querySelector(".tipo-clima");
    const temperaturaActual = document.querySelector(".temperatura-actual");
    const humedad = document.querySelector(".humedad");
    const velocidadViento = document.querySelector(".wind-speed");
    const direccionViento = document.querySelector(".wind-direction");
    const imgClima = document.querySelector(".img-cat");


    const obtenerDatosClima = (weatherCode) => {

        if (weatherCode >= 0 && weatherCode < 3) {

            return { text: "☀️ Soleado", img: "assets/img/sol.png" };

        } else if (weatherCode >= 3 && weatherCode < 51) {

            return { text: "☁️ Nublado", img: "assets/img/nubes.png" };

        } else if (weatherCode >= 51 && weatherCode < 66) {

            return { text: "☔ Lluvioso", img: "assets/img/lluvia.png" };

        } else if (weatherCode >= 66 && weatherCode < 80) {

            return { text: "❄️ Nevado", img: "assets/img/nieve.png" };

        } else if (weatherCode >= 80 && weatherCode < 90) {

            return { text: "🌧️ Lluvioso con chubascos", img: "assets/img/lluvia-chubascos.png" };

        } else if (weatherCode >= 90) {

            return { text: "🌩️ Tormenta", img: "assets/img/tormenta.png" };

        }

        return { text: "❌ Tiempo desconocido", img: "assets/img/desconocido.png" };
    };

    const marginMensaje = () => {
        mensaje.style.margin = "2rem";
    }

    const limpiarResultados = () => {
        listaCiudades.style.display = "none";
        resultadoDiv.style.display = "none";
        ciudad.textContent = "";
        tipoClima.textContent = "";
        temperaturaActual.textContent = "";
        humedad.textContent = "";
        velocidadViento.textContent = "";
        direccionViento.textContent = "";
        mensaje.style.margin = "0";
        mensaje.textContent = "";
    };

    const buscarClima = async () => {
        const ciudadBuscada = inputCiudad.value.trim();

        if (ciudadBuscada === "") {
            limpiarResultados();
            marginMensaje();
            mensaje.textContent = "Por favor, ingresa una ciudad";
            return;
        }

        marginMensaje();
        mensaje.textContent = "Cargando...";
        limpiarResultados();

        try {
            // Obtener coordenadas de múltiples ciudades
            const geocodingUrl = `https://nominatim.openstreetmap.org/search?q=${ciudadBuscada}&format=json&limit=5`;
            const geocodingResponse = await fetch(geocodingUrl);

            if (!geocodingResponse.ok) {
                marginMensaje();
                mensaje.textContent = "Error al obtener las coordenadas de la ciudad";
                return;
            }

            const geocodingData = await geocodingResponse.json();

            if (geocodingData.length === 0) {
                marginMensaje();
                mensaje.textContent = "No se ha encontrado la ciudad";
                return;
            }

            // Mostrar la lista de ciudades
            if (geocodingData.length > 1) {
                marginMensaje();
                mensaje.textContent = "Se encontraron varias ciudades. Por favor, selecciona una.";
                listaCiudades.style.display = "block";

                const defaultOption = document.createElement("option");
                defaultOption.textContent = "Selecciona una ciudad...";
                defaultOption.value = "";
                defaultOption.selected = true;
                defaultOption.disabled = true;
                listaCiudades.appendChild(defaultOption);

                geocodingData.forEach(city => {
                    const option = document.createElement("option");
                    option.value = JSON.stringify({ lat: city.lat, lon: city.lon, name: city.display_name });
                    option.textContent = city.display_name;
                    listaCiudades.appendChild(option);
                });

                return;
            }

            // Si solo hay un resultado, obtener el clima directamente
            const { lat, lon, display_name } = geocodingData[0];
            await obtenerYMostrarClima(lat, lon, display_name);

        } catch (error) {
            marginMensaje();
            mensaje.textContent = `Error: ${error.message}`;
            console.error("Hubo un error:", error);
            limpiarResultados();
        }
    };

    const obtenerYMostrarClima = async (lat, lon, cityName) => {
        mensaje.textContent = "Obteniendo datos del clima...";

        try {
            const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weathercode&forecast_days=1`;
            const weatherResponse = await fetch(weatherUrl);

            if (!weatherResponse.ok) {
                marginMensaje();
                mensaje.textContent = "Error al obtener el clima.";
            }

            const weatherData = await weatherResponse.json();

            const { temperature_2m, relative_humidity_2m, wind_speed_10m, wind_direction_10m, time, weathercode } = weatherData.hourly;
            const horaActual = new Date().getHours();

            const index = time.findIndex(t => new Date(t).getHours() === horaActual);

            if (index !== -1) {
                ciudad.textContent = cityName;
                temperaturaActual.textContent = `${temperature_2m[index]} °C`;
                humedad.textContent = `${relative_humidity_2m[index]} %`;
                velocidadViento.textContent = `${(wind_speed_10m[index] * 3.6).toFixed(1)} km/h`;
                direccionViento.textContent = `${wind_direction_10m[index]}°`;

                // Obtener el código del clima y actualizar la imagen
                const climaInfo = obtenerDatosClima(weathercode[index]);
                imgClima.style.opacity = 0;

                setTimeout(() => {
                    imgClima.src = climaInfo.img;
                    imgClima.style.opacity = 1;
                }, 300);

                tipoClima.textContent = climaInfo.text;
                resultadoDiv.style.display = "flex";
                mensaje.style.margin = "0";
                mensaje.textContent = "";

            } else {
                marginMensaje();
                mensaje.textContent = "No se encontraron datos para la hora actual.";
            }

        } catch (error) {
            marginMensaje();
            mensaje.textContent = `Error: ${error.message}`;
            console.error("Hubo un error:", error);
            limpiarResultados();
        }
    };


    btn.addEventListener("click", (e) => {
        e.preventDefault();
        buscarClima();
    });

    inputCiudad.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            buscarClima();
        }
    });

    listaCiudades.addEventListener("change", (e) => {
        const selectedOption = e.target.value;
        if (selectedOption !== "") {
            listaCiudades.style.display = "none";
            const { lat, lon, name } = JSON.parse(selectedOption);
            obtenerYMostrarClima(lat, lon, name);
        }
    });

});