import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Temas } from '../models/temas';
import { QuizResultDetail } from '../models/quiz-result-detail';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private finalScore: number = 0;

  // Almacena el historial detallado de la sesión
  private quizHistory: QuizResultDetail[] = [];

  // Propiedad para almacenar el ID del tema seleccionado
  private selectedTemaId: string | null = null;

  // Almacena el timestamp de inicio
  private startTime: number | null = null;

  // Almacena la duración total en milisegundos
  private totalTimeMs: number | null = null;

  public startQuiz(): void {
    this.startTime = Date.now();
    this.totalTimeMs = null; // Resetea el tiempo por si acaso
    // ... otros reseteos (puntuación, preguntas, etc.)
  }

  // 2. Método para registrar el fin del quiz y calcular el tiempo
  public endQuiz(): void {
    if (this.startTime) {
      this.totalTimeMs = Date.now() - this.startTime;
      this.startTime = null; // Opcional: limpiar para evitar reinicios accidentales
    }
  }

  // 3. Método para obtener el tiempo total
  public getTotalTime(): number | null {
    return this.totalTimeMs;
  }

  // Datos de los temas
  private availableTemas: Temas[] = [

    { id: 'animales', name: 'Animales', icon: '🦁', description: 'Sumérgete en el reino animal: Desde el mamífero más grande hasta el insecto más pequeño. ¡Aprende datos asombrosos!' },
    { id: 'frutas', name: 'Frutas', icon: '🍓', description: 'Pon a prueba tu conocimiento: ¿Es baya o no es baya? Retos jugosos sobre tus frutas favoritas.' },
    { id: 'naturaleza', name: 'Naturaleza', icon: '⛰️', description: 'Explora el planeta: Montañas, océanos, volcanes y fenómenos naturales que te dejarán sin palabras.' },
    { id: 'comidas-mundo', name: 'Comidas del mundo', icon: '🍴', description: 'Un viaje culinario: Descubre el origen de platos exóticos, ingredientes raros y tradiciones gastronómicas.' },
    { id: 'geo', name: 'Geografía Mundial', icon: '🌍', description: '¡A viajar! Desafía tu conocimiento sobre capitales, banderas, monumentos icónicos y hechos geográficos cruciales.' },
    { id: 'mujeres', name: 'Mujeres Históricas', icon: '👑', description: 'Conoce a las pioneras: Preguntas sobre científicas, líderes políticas y artistas que cambiaron la historia.' },
  ];

  // Mapeo de preguntas
  private availableQuestions: Map<string, Question[]> = new Map([
    // Fragmento de tu QuizService.ts (availableQuestions)
    ['animales', [
      { id: 1, text: "¿Cuál es el animal terrestre más rápido del mundo?", options: ["Antílope", "León", "Guepardo"], correctAnswer: "Guepardo", explanation: 'El Guepardo puede alcanzar velocidades de hasta 112 km/h en distancias cortas.' },
      { id: 2, text: "¿Qué mamífero es conocido por dormir verticalmente?", options: ["Jirafa", "Calamar", "Murciélago"], correctAnswer: "Murciélago", explanation: 'Los murciélagos duermen colgados boca abajo en colonias.' },
      { id: 3, text: "¿Cuál de estos animales es un marsupial?", options: ["Koala", "Oso hormiguero", "Mono"], correctAnswer: "Koala", explanation: 'Los koalas, como los canguros, son marsupiales y llevan a sus crías en una bolsa.' },
      { id: 4, text: "¿Qué animal es el único mamífero que puede volar activamente?", options: ["Ardilla voladora", "Pájaro carpintero", "Murciélago"], correctAnswer: "Murciélago", explanation: 'Los murciélagos son los únicos mamíferos con la capacidad de volar sostenidamente.' },
      { id: 5, text: "¿De qué se alimenta principalmente un panda gigante?", options: ["Bambú", "Hojas de eucalipto", "Pescado"], correctAnswer: "Bambú", explanation: 'La dieta de un panda gigante se compone casi exclusivamente de bambú.' },
      { id: 6, text: "¿Dónde completa su desarrollo la cría de un canguro?", options: ["Bajo tierra", "En el nido", "En la bolsa marsupial"], correctAnswer: "En la bolsa marsupial", explanation: 'Las crías nacen muy pequeñas y completan su crecimiento dentro del marsupio de la madre.' },
      { id: 7, text: "¿Qué animal puede cambiar el color de su piel para camuflarse?", options: ["Camaleón", "Tortuga", "Serpiente"], correctAnswer: "Camaleón", explanation: 'El camaleón cambia de color para camuflarse, regular la temperatura y comunicarse.' },
      { id: 8, text: "¿Cuántas patas tiene una araña?", options: ["Diez", "Seis", "Ocho"], correctAnswer: "Ocho", explanation: 'Las arañas son arácnidos y, a diferencia de los insectos, tienen ocho patas.' },
      { id: 9, text: "¿Qué animal produce la miel?", options: ["Abeja", "Mosca", "Hormiga"], correctAnswer: "Abeja", explanation: 'Las abejas obreras son las encargadas de recolectar el néctar y transformarlo en miel.' },
      { id: 10, text: "¿El tiburón pertenece a la clase de los...?", options: ["Reptiles", "Mamíferos", "Peces"], correctAnswer: "Peces", explanation: 'Aunque tienen esqueletos de cartílago, los tiburones son peces.' },
      { id: 11, text: "¿Qué tipo de animal es un ornitorrinco?", options: ["Mamífero", "Ave", "Reptil"], correctAnswer: "Mamífero", explanation: 'El ornitorrinco es un mamífero monotrema, lo que significa que pone huevos.' },
      { id: 12, text: "¿Cuál es el animal que tiene el cuello más largo?", options: ["Avestruz", "Elefante", "Jirafa"], correctAnswer: "Jirafa", explanation: 'El cuello extremadamente largo de la jirafa le permite alcanzar hojas altas.' },
      { id: 13, text: "¿Qué ave es conocida por construir grandes nidos comunales?", options: ["Águila", "Gorrión", "Tejedor"], correctAnswer: "Tejedor", explanation: 'El Tejedor Social construye nidos enormes que albergan cientos de aves.' },
      { id: 14, text: "¿Cuál es el reptil más grande del mundo?", options: ["Cocodrilo marino", "Piton", "Anaconda"], correctAnswer: "Cocodrilo marino", explanation: 'El cocodrilo marino es el más grande, llegando a medir más de 6 metros.' },
      { id: 15, text: "¿Qué animal marino es famoso por emitir pulsos de ecolocalización?", options: ["Ballena jorobada", "Foca", "Delfín"], correctAnswer: "Delfín", explanation: 'Los delfines utilizan la ecolocalización para navegar y cazar.' },
      { id: 16, text: "¿Cuál de estos es un animal de sangre fría?", options: ["Gato", "Perro", "Lagarto"], correctAnswer: "Lagarto", explanation: 'Los lagartos son poiquilotermos (sangre fría) y dependen del ambiente para regular su temperatura.' },
      { id: 17, text: "¿Cuántos corazones tiene un pulpo?", options: ["Dos", "Uno", "Tres"], correctAnswer: "Tres", explanation: 'Los pulpos tienen tres corazones: dos bombean sangre a las branquias y uno al resto del cuerpo.' },
      { id: 18, text: "¿Qué animal tiene las huellas dactilares más parecidas a las humanas?", options: ["Oso", "Chimpancé", "Koala"], correctAnswer: "Koala", explanation: 'Las huellas dactilares de los koalas son muy similares a las humanas, incluso a nivel microscópico.' },
      { id: 19, text: "¿Cómo se llama el proceso en el que las serpientes cambian su piel?", options: ["Ecdisis", "Metamorfosis", "Muda"], correctAnswer: "Ecdisis", explanation: 'La ecdisis es el término biológico para el proceso de muda en los reptiles.' },
      { id: 20, text: "¿Qué animal puede vivir más tiempo sin beber agua?", options: ["Tigre", "Camello", "Rata canguro"], correctAnswer: "Rata canguro", explanation: 'La rata canguro obtiene casi toda el agua que necesita del metabolismo de las semillas que come.' }
    ]],

    ['frutas', [
      { id: 1, text: "¿Qué fruta es conocida como la 'manzana de oro'?", options: ["Tomate", "Albaricoque", "Melón"], correctAnswer: "Albaricoque", explanation: 'El albaricoque tiene un color amarillo dorado que le valió este apodo histórico.' },
      { id: 2, text: "Según la botánica, ¿cuál de estas frutas es técnicamente una baya?", options: ["Naranja", "Fresa", "Plátano"], correctAnswer: "Plátano", explanation: 'Botánicamente, una baya es una fruta carnosa derivada de un único ovario que contiene múltiples semillas. El plátano cumple esta definición, mientras que la fresa es un fruto accesorio (falso fruto).' },
      { id: 3, text: "¿Qué fruta tropical es una de las mayores fuentes de Vitamina C?", options: ["Mango", "Kiwi", "Piña"], correctAnswer: "Kiwi", explanation: 'El kiwi contiene una cantidad excepcionalmente alta de Vitamina C por gramo.' },
      { id: 4, text: "¿Cuál es la única fruta que tiene las semillas por fuera?", options: ["Fresa", "Higo", "Granada"], correctAnswer: "Fresa", explanation: 'Técnicamente, las semillas visibles de la fresa (aquenios) son los verdaderos frutos.' },
      { id: 5, text: "¿Qué fruta madura más rápido si se guarda junto a un plátano?", options: ["Limón", "Uva", "Aguacate"], correctAnswer: "Aguacate", explanation: 'Los plátanos liberan gas etileno, un potente promotor de la maduración de otras frutas como el aguacate.' },
      { id: 6, text: "¿El coco es un tipo de...?", options: ["Fruta seca", "Drupa", "Fruto seco"], correctAnswer: "Drupa", explanation: 'El coco es una drupa fibrosa, al igual que el melocotón o la aceituna.' },
      { id: 7, text: "¿Qué color indica que un arándano está listo para ser cosechado?", options: ["Verde brillante", "Rojo", "Azul oscuro"], correctAnswer: "Azul oscuro", explanation: 'Los arándanos están listos cuando alcanzan un color azul oscuro uniforme.' },
      { id: 8, text: "¿Cuál de estas frutas pertenece a la familia de las Rosáceas?", options: ["Higo", "Pera", "Piña"], correctAnswer: "Pera", explanation: 'La pera, la manzana y las fresas forman parte de la familia de las Rosáceas.' },
      { id: 9, text: "¿De qué fruta se obtiene la 'fruta de la pasión'?", options: ["Lichi", "Guayaba", "Maracuyá"], correctAnswer: "Maracuyá", explanation: 'La fruta de la pasión es el nombre común que se le da al maracuyá en muchos lugares.' },
      { id: 10, text: "¿Qué fruta se utiliza para elaborar la sidra?", options: ["Manzana", "Pera", "Uva"], correctAnswer: "Manzana", explanation: 'La sidra se obtiene principalmente por la fermentación del jugo de manzana.' },
      { id: 11, text: "¿Cuál es el fruto del olivo?", options: ["Almendra", "Nuez", "Aceituna"], correctAnswer: "Aceituna", explanation: 'El fruto del olivo es la aceituna, de la cual se extrae el aceite.' },
      { id: 12, text: "¿Qué fruta es conocida por tener forma de corazón y ser la favorita de los osos?", options: ["Mora", "Cereza", "Frambuesa"], correctAnswer: "Cereza", explanation: 'Las cerezas son populares por su dulzura y forma distintiva.' },
      { id: 13, text: "¿Qué fruta cítrica es un híbrido entre la toronja y la naranja mandarina?", options: ["Tangelo", "Clementina", "Lima"], correctAnswer: "Tangelo", explanation: 'El tangelo es un cítrico jugoso y fácil de pelar, un cruce entre toronja y mandarina.' },
      { id: 14, text: "¿Cuál es el principal productor mundial de plátanos?", options: ["Brasil", "Ecuador", "India"], correctAnswer: "India", explanation: 'India es el principal productor mundial de plátanos, aunque la mayoría es para consumo interno.' },
      { id: 15, text: "¿Qué parte de la planta es el 'corazón' de la alcachofa?", options: ["Raíz", "Flor inmadura", "Hojas"], correctAnswer: "Flor inmadura", explanation: 'La parte comestible de la alcachofa es la cabeza floral inmadura.' },
      { id: 16, text: "¿Qué fruta es famosa por contener una enzima llamada bromelina?", options: ["Papaya", "Mango", "Piña"], correctAnswer: "Piña", explanation: 'La bromelina ayuda en la digestión de proteínas y se encuentra en la piña.' },
      { id: 17, text: "¿Cuál es el nombre de la variedad de uva sin semillas más popular?", options: ["Tempranillo", "Thompson Seedless", "Malbec"], correctAnswer: "Thompson Seedless", explanation: 'Es una de las variedades de uva de mesa más cultivadas en el mundo.' },
      { id: 18, text: "¿De qué fruta es el hueso el más venenoso si se mastica?", options: ["Manzana", "Ciruela", "Durazno (Melocotón)"], correctAnswer: "Durazno (Melocotón)", explanation: 'Los huesos de las drupas contienen amigdalina, que se convierte en cianuro al masticarse.' },
      { id: 19, text: "¿Qué fruta crece directamente del tronco del árbol (caulifloria)?", options: ["Lulo", "Cacao", "Chirimoya"], correctAnswer: "Cacao", explanation: 'Los frutos del cacao crecen directamente en el tronco y ramas viejas, un proceso llamado caulifloria.' },
      { id: 20, text: "¿Cuál de estas frutas es originaria de China?", options: ["Kiwi", "Fresa", "Naranja"], correctAnswer: "Naranja", explanation: 'La naranja dulce tiene su origen en China.' }
    ]],

    ['naturaleza', [
      { id: 1, text: "¿Cuál es el proceso por el cual el agua líquida se convierte en gas?", options: ["Evaporación", "Precipitación", "Condensación"], correctAnswer: "Evaporación", explanation: 'La evaporación es el cambio de estado del agua de líquido a gaseoso, esencial para el ciclo hidrológico.' },
      { id: 2, text: "¿Qué capa de la Tierra contiene la mayor parte del aire que respiramos?", options: ["Mesosfera", "Estratosfera", "Troposfera"], correctAnswer: "Troposfera", explanation: 'La troposfera es la capa más baja de la atmósfera y contiene casi todo el vapor de agua y el aire.' },
      { id: 3, text: "¿Cuál es el gas más abundante en la atmósfera terrestre?", options: ["Argón", "Oxígeno", "Nitrógeno"], correctAnswer: "Nitrógeno", explanation: 'El nitrógeno constituye aproximadamente el 78% del aire seco de la atmósfera.' },
      { id: 4, text: "¿Qué fenómeno natural ocurre cuando una placa tectónica se desliza bajo otra?", options: ["Falla", "Subducción", "Erosión"], correctAnswer: "Subducción", explanation: 'La subducción ocurre en los límites convergentes y a menudo provoca volcanes y terremotos.' },
      { id: 5, text: "¿Cómo se llama una gran masa de hielo que se mueve lentamente?", options: ["Iceberg", "Tundra", "Glaciar"], correctAnswer: "Glaciar", explanation: 'Los glaciares son ríos de hielo que se mueven bajo su propio peso.' },
      { id: 6, text: "¿Cuál es el desierto más grande del mundo?", options: ["Atacama", "Gobi", "Sahara"], correctAnswer: "Sahara", explanation: 'El Sahara es el desierto cálido más grande del mundo, cubriendo gran parte del norte de África.' },
      { id: 7, text: "¿Qué tipo de roca se forma a partir del enfriamiento del magma?", options: ["Ígnea", "Metamórfica", "Sedimentaria"], correctAnswer: "Ígnea", explanation: 'Las rocas ígneas se forman a partir de magma o lava enfriada y solidificada.' },
      { id: 8, text: "¿Cuál es el pico más alto de la Cordillera de los Andes?", options: ["Monte McKinley", "Mount Everest", "Aconcagua"], correctAnswer: "Aconcagua", explanation: 'El Aconcagua se encuentra en Argentina y es el punto más alto de los Andes y de todo el continente americano.' },
      { id: 9, text: "¿Cómo se llama el área donde un río fluye hacia el mar?", options: ["Raudal", "Cascada", "Estuario"], correctAnswer: "Estuario", explanation: 'Un estuario es la desembocadura de un río en el mar, donde se mezcla agua dulce y salada.' },
      { id: 10, text: "¿Qué proceso es el responsable de crear los cañones?", options: ["Erosión hídrica", "Actividad volcánica", "Viento"], correctAnswer: "Erosión hídrica", explanation: 'La erosión causada por el flujo constante de un río (erosión hídrica) es lo que forma los cañones profundos.' },
      { id: 11, text: "¿Cuál es el bosque tropical más grande del mundo?", options: ["Valdiviano", "Congo", "Amazonas"], correctAnswer: "Amazonas", explanation: 'El Bosque Amazónico es el más grande y biodiverso del planeta.' },
      { id: 12, text: "¿Cómo se llama la fuerza que atrae la lluvia al suelo?", options: ["Fricción", "Gravedad", "Presión"], correctAnswer: "Gravedad", explanation: 'La gravedad es la fuerza fundamental que hace que todos los objetos caigan, incluyendo las gotas de lluvia.' },
      { id: 13, text: "¿Cuál es el lago de agua dulce más grande del mundo por volumen?", options: ["Lago Tanganica", "Lago Superior", "Lago Baikal"], correctAnswer: "Lago Baikal", explanation: 'El Lago Baikal en Siberia contiene aproximadamente el 20% del agua dulce no congelada del mundo.' },
      { id: 14, text: "¿Qué escala se utiliza para medir la magnitud de un terremoto?", options: ["Beaufort", "Kelvin", "Richter"], correctAnswer: "Richter", explanation: 'La escala de Richter mide la energía liberada por un terremoto.' },
      { id: 15, text: "¿Cómo se llama la zona más profunda del océano?", options: ["Llanura Abisal", "Fosa Marina", "Plataforma Continental"], correctAnswer: "Fosa Marina", explanation: 'Las fosas marinas son trincheras profundas formadas por subducción de placas.' },
      { id: 16, text: "¿Qué tipo de energía se obtiene del calor interno de la Tierra?", options: ["Geotérmica", "Eólica", "Solar"], correctAnswer: "Geotérmica", explanation: 'La energía geotérmica aprovecha el calor del núcleo terrestre.' },
      { id: 17, text: "¿Cómo se llama el proceso de la caída de las hojas de los árboles en otoño?", options: ["Respiración", "Fotosíntesis", "Defoliación"], correctAnswer: "Defoliación", explanation: 'La defoliación es la pérdida natural de hojas de los árboles caducifolios.' },
      { id: 18, text: "¿Qué componente forma la mayor parte de la arena de playa?", options: ["Cuarzo", "Feldespato", "Piedra pómez"], correctAnswer: "Cuarzo", explanation: 'El cuarzo es un mineral resistente y es el componente principal de muchas arenas.' },
      { id: 19, text: "¿Qué fenómeno se caracteriza por un remolino de aire violento que desciende de una tormenta?", options: ["Tornado", "Tifón", "Tormenta eléctrica"], correctAnswer: "Tornado", explanation: 'Un tornado es una columna de aire que gira violentamente, en contacto con la superficie de la Tierra y una nube cumulonimbus.' },
      { id: 20, text: "¿Cuál es la montaña más alta del mundo sobre el nivel del mar?", options: ["Kangchenjunga", "K2", "Monte Everest"], correctAnswer: "Monte Everest", explanation: 'El Monte Everest, con 8.848,86 metros, es el pico más alto sobre el nivel medio del mar.' }
    ]],

    ['comidas-mundo', [
      { id: 1, text: "¿De qué país es originaria la pasta?", options: ["Grecia", "China", "Italia"], correctAnswer: "Italia", explanation: 'Aunque China tenía fideos, la pasta moderna de trigo duro como la conocemos es originaria de Italia.' },
      { id: 2, text: "¿Cuál es el ingrediente principal de la paella española?", options: ["Arroz", "Patata", "Cerdo"], correctAnswer: "Arroz", explanation: 'El arroz es el componente esencial de la paella, que le da su estructura y textura.' },
      { id: 3, text: "¿Qué plato mexicano consiste en carne, queso y frijoles envueltos en una tortilla?", options: ["Enchilada", "Taco", "Burrito"], correctAnswer: "Burrito", explanation: 'El burrito es un plato de gran tamaño envuelto completamente en una tortilla de harina.' },
      { id: 4, text: "¿En qué país es el 'Curry' un plato básico?", options: ["Tailandia", "India", "Japón"], correctAnswer: "India", explanation: 'El término curry se asocia a la cocina india, donde hay innumerables variedades.' },
      { id: 5, text: "¿Cuál es el nombre del pan plano indio que se hornea en un horno 'tandoor'?", options: ["Naan", "Pita", "Chapati"], correctAnswer: "Naan", explanation: 'El pan Naan se cocina tradicionalmente en las paredes de un horno cilíndrico de arcilla (tandoor).' },
      { id: 6, text: "¿Qué plato japonés consiste en pescado crudo sobre arroz avinagrado?", options: ["Ramen", "Sashimi", "Sushi"], correctAnswer: "Sushi", explanation: 'El sushi combina arroz sazonado con otros ingredientes, comúnmente pescado crudo.' },
      { id: 7, text: "¿Cuál es la carne principal utilizada tradicionalmente en el plato francés 'Coq au Vin'?", options: ["Pato", "Ternera", "Pollo"], correctAnswer: "Pollo", explanation: 'Literalmente, "Coq au Vin" significa "Gallo al Vino", y tradicionalmente se usa pollo.' },
      { id: 8, text: "¿Qué país es famoso por el plato 'Moussaka', a base de berenjenas, carne y bechamel?", options: ["Líbano", "Turquía", "Grecia"], correctAnswer: "Grecia", explanation: 'La Moussaka griega es un plato al horno similar a la lasaña, con berenjena en lugar de pasta.' },
      { id: 9, text: "¿Cómo se llama la sopa rusa fría o caliente a base de remolacha?", options: ["Gazpacho", "Goulash", "Borscht"], correctAnswer: "Borscht", explanation: 'El Borscht es una sopa de origen ucraniano popular en Rusia y Europa del Este, con remolacha como ingrediente clave.' },
      { id: 10, text: "¿De qué país proviene el postre 'Tiramisú'?", options: ["Italia", "España", "Francia"], correctAnswer: "Italia", explanation: 'El Tiramisú, con queso mascarpone y café, es un postre clásico italiano.' },
      { id: 11, text: "¿Cuál es el ingrediente principal utilizado para hacer el 'Hummus' de Oriente Medio?", options: ["Sésamo", "Lentejas", "Garbanzos"], correctAnswer: "Garbanzos", explanation: 'El Hummus es una pasta de garbanzos cocidos y triturados con tahini (sésamo).' },
      { id: 12, text: "¿Qué tipo de carne se usa en el plato tradicional alemán 'Bratwurst'?", options: ["Salchicha (Cerdo/Ternera)", "Cordero", "Pescado"], correctAnswer: "Salchicha (Cerdo/Ternera)", explanation: 'Bratwurst se refiere a varios tipos de salchichas alemanas, generalmente de cerdo, ternera o ambas.' },
      { id: 13, text: "¿El 'Chilli con Carne' es un plato asociado a qué país?", options: ["Colombia", "México", "Estados Unidos"], correctAnswer: "Estados Unidos", explanation: 'El Chili con Carne, como se consume hoy, se originó en Texas, EE. UU.' },
      { id: 14, text: "¿Qué ingrediente le da su color amarillo al plato español 'Paella'?", options: ["Pimentón", "Curry", "Azafrán"], correctAnswer: "Azafrán", explanation: 'El azafrán es la especia que tradicionalmente proporciona el color amarillo y el aroma a la paella.' },
      { id: 15, text: "¿Qué bebida es la base del postre británico 'Trifle'?", options: ["Jerez (Sherry)", "Té", "Vino"], correctAnswer: "Jerez (Sherry)", explanation: 'El bizcocho del Trifle se empapa en vino de Jerez o licor.' },
      { id: 16, text: "¿Qué país inventó la 'Feijoada', un guiso de frijoles negros y carne?", options: ["Angola", "Portugal", "Brasil"], correctAnswer: "Brasil", explanation: 'La feijoada es considerada el plato nacional de Brasil.' },
      { id: 17, text: "¿El 'Kimchi' es un plato picante y fermentado de qué país asiático?", options: ["China", "Vietnam", "Corea del Sur"], correctAnswer: "Corea del Sur", explanation: 'El Kimchi, generalmente de col fermentada, es un alimento básico de Corea.' },
      { id: 18, text: "¿Qué se envuelve en hojas de parra para hacer el plato griego 'Dolmades'?", options: ["Pescado", "Queso", "Carne y arroz"], correctAnswer: "Carne y arroz", explanation: 'Los Dolmades son hojas de parra rellenas, generalmente con una mezcla de carne picada y arroz.' },
      { id: 19, text: "¿Cómo se llama el pan francés que tiene una forma larga y delgada?", options: ["Baguette", "Brioche", "Croissant"], correctAnswer: "Baguette", explanation: 'La Baguette es el pan más icónico de Francia.' },
      { id: 20, text: "¿De qué país son originarias las 'Arepas'?", options: ["Argentina", "Perú", "Colombia y Venezuela"], correctAnswer: "Colombia y Venezuela", explanation: 'Las arepas son un alimento tradicional y básico de las cocinas de Colombia y Venezuela.' }
    ]],

    ['geo', [
      { id: 1, text: "¿Cuál es la capital de Australia?", options: ["Melbourne", "Sídney", "Canberra"], correctAnswer: "Canberra", explanation: 'A menudo se confunde con Sídney o Melbourne, pero Canberra es la capital de Australia.' },
      { id: 2, text: "¿En qué continente se encuentra el desierto del Sahara?", options: ["América", "Asia", "África"], correctAnswer: "África", explanation: 'El Sahara ocupa gran parte del norte de África.' },
      { id: 3, text: "¿Cuál es el río más largo del mundo?", options: ["Yangtsé", "Amazonas", "Nilo"], correctAnswer: "Nilo", explanation: 'El Nilo es tradicionalmente considerado el río más largo, aunque esta afirmación a veces se disputa con el Amazonas.' },
      { id: 4, text: "¿Qué país es conocido por tener forma de bota?", options: ["Portugal", "Grecia", "Italia"], correctAnswer: "Italia", explanation: 'La península italiana tiene una forma muy distintiva que se asemeja a una bota.' },
      { id: 5, text: "¿Cuál es la capital de Canadá?", options: ["Ottawa", "Vancouver", "Toronto"], correctAnswer: "Ottawa", explanation: 'Ottawa es la capital federal de Canadá, no Toronto ni Vancouver.' },
      { id: 6, text: "¿Qué monumento se encuentra en París y fue terminado en 1889?", options: ["Catedral de Notre Dame", "Arco del Triunfo", "Torre Eiffel"], correctAnswer: "Torre Eiffel", explanation: 'La Torre Eiffel fue inaugurada para la Exposición Universal de 1889.' },
      { id: 7, text: "¿En qué país se encuentra la Gran Muralla?", options: ["Corea del Sur", "Japón", "China"], correctAnswer: "China", explanation: 'La Gran Muralla es una serie de fortificaciones construidas en China.' },
      { id: 8, text: "¿Qué océano baña las costas occidentales de Europa?", options: ["Pacífico", "Índico", "Atlántico"], correctAnswer: "Atlántico", explanation: 'Las costas occidentales de Europa dan al Océano Atlántico.' },
      { id: 9, text: "¿Cuál es el país más grande del mundo por superficie terrestre?", options: ["Rusia", "Canadá", "China"], correctAnswer: "Rusia", explanation: 'Rusia es el país con la mayor superficie territorial del mundo.' },
      { id: 10, text: "¿Cuál es la capital de Brasil?", options: ["São Paulo", "Río de Janeiro", "Brasilia"], correctAnswer: "Brasilia", explanation: 'Brasilia fue construida y designada capital en 1960, reemplazando a Río de Janeiro.' },
      { id: 11, text: "¿Qué estrecho separa Europa de África?", options: ["Canal de Suez", "Estrecho de Bering", "Estrecho de Gibraltar"], correctAnswer: "Estrecho de Gibraltar", explanation: 'El Estrecho de Gibraltar conecta el Océano Atlántico con el Mar Mediterráneo.' },
      { id: 12, text: "¿Cuál es el país más poblado del mundo?", options: ["India", "China", "Estados Unidos"], correctAnswer: "India", explanation: 'India superó recientemente a China como el país más poblado del mundo.' },
      { id: 13, text: "¿En qué ciudad se encuentra la Puerta de Brandeburgo?", options: ["Berlín", "Viena", "Múnich"], correctAnswer: "Berlín", explanation: 'La Puerta de Brandeburgo es un símbolo icónico de Berlín, Alemania.' },
      { id: 14, text: "¿A qué cordillera pertenece el pico Everest?", options: ["Rocosas", "Alpes", "Himalaya"], correctAnswer: "Himalaya", explanation: 'El Monte Everest es parte de la cordillera del Himalaya.' },
      { id: 15, text: "¿Qué país tiene más husos horarios diferentes?", options: ["Canadá", "Rusia", "Francia"], correctAnswer: "Francia", explanation: 'Debido a sus territorios de ultramar, Francia tiene el mayor número de husos horarios.' },
      { id: 16, text: "¿Cuál es el nombre del famoso volcán activo cerca de Nápoles, Italia?", options: ["Krakatoa", "Etna", "Vesubio"], correctAnswer: "Vesubio", explanation: 'El Vesubio es famoso por la erupción que destruyó Pompeya y Herculano en el año 79 d.C.' },
      { id: 17, text: "¿Qué ciudad es conocida como la 'Ciudad Eterna'?", options: ["Estambul", "Atenas", "Roma"], correctAnswer: "Roma", explanation: 'Roma es conocida como la Ciudad Eterna por su historia de más de dos milenios.' },
      { id: 18, text: "¿Cuál es el estado de EE. UU. más grande por área?", options: ["California", "Texas", "Alaska"], correctAnswer: "Alaska", explanation: 'Alaska es el estado más grande, con una superficie que supera a Texas y California combinados.' },
      { id: 19, text: "¿Qué país es famoso por ser un archipiélago de miles de islas?", options: ["Groenlandia", "Islandia", "Filipinas"], correctAnswer: "Filipinas", explanation: 'Filipinas es un archipiélago compuesto por más de 7,000 islas.' },
      { id: 20, text: "¿Cuál es la capital de Egipto?", options: ["Luxor", "Alejandría", "El Cairo"], correctAnswer: "El Cairo", explanation: 'El Cairo es la capital de Egipto y la ciudad más grande del mundo árabe.' }
    ]],

    ['mujeres', [
      { id: 1, text: "¿Qué científica ganó dos Premios Nobel en distintas disciplinas (Física y Química)?", options: ["Ada Lovelace", "Rosalind Franklin", "Marie Curie"], correctAnswer: "Marie Curie", explanation: 'Marie Curie es la única persona en la historia en ganar Premios Nobel en dos ciencias diferentes.' },
      { id: 2, text: "¿Qué mujer fue la primera programadora de la historia, trabajando con Charles Babbage?", options: ["Ada Lovelace", "Hedy Lamarr", "Grace Hopper"], correctAnswer: "Ada Lovelace", explanation: 'Ada Lovelace es considerada la primera programadora por su trabajo en el motor analítico de Babbage.' },
      { id: 3, text: "¿Qué líder británica fue conocida como la 'Dama de Hierro'?", options: ["Reina Victoria", "Isabel II", "Margaret Thatcher"], correctAnswer: "Margaret Thatcher", explanation: 'Margaret Thatcher fue la primera mujer en ser Primera Ministra del Reino Unido.' },
      { id: 4, text: "¿Quién fue la primera mujer en volar sola a través del Océano Atlántico?", options: ["Valentina Tereshkova", "Jacqueline Cochran", "Amelia Earhart"], correctAnswer: "Amelia Earhart", explanation: 'Amelia Earhart realizó esta hazaña en 1932.' },
      { id: 5, text: "¿Quién es la autora de la novela clásica 'Orgullo y Prejuicio'?", options: ["Emily Brontë", "Virginia Woolf", "Jane Austen"], correctAnswer: "Jane Austen", explanation: 'Jane Austen escribió esta obra fundamental de la literatura inglesa, publicada en 1813.' },
      { id: 6, text: "¿Qué pintora mexicana es famosa por sus autorretratos y por su ceja unida?", options: ["Frida Kahlo", "Leonora Carrington", "Tamara de Lempicka"], correctAnswer: "Frida Kahlo", explanation: 'Frida Kahlo es famosa por su estilo de vida y sus autorretratos emotivos.' },
      { id: 7, text: "¿Qué joven judía escribió un diario mientras se escondía del nazismo?", options: ["Sophie Scholl", "Hanna Senesh", "Anna Frank"], correctAnswer: "Anna Frank", explanation: 'Anna Frank y su familia se escondieron en Ámsterdam hasta que fueron descubiertos en 1944.' },
      { id: 8, text: "¿Quién lideró el movimiento por los derechos civiles y fue fundamental en el boicot de autobuses en Montgomery?", options: ["Maya Angelou", "Harriet Tubman", "Rosa Parks"], correctAnswer: "Rosa Parks", explanation: 'Rosa Parks se negó a ceder su asiento a un pasajero blanco, lo que desencadenó el boicot de Montgomery.' },
      { id: 9, text: "¿Qué faraona gobernó Egipto, siendo una de las mujeres con más poder en la antigüedad?", options: ["Cleopatra VII", "Nefertiti", "Hatshepsut"], correctAnswer: "Hatshepsut", explanation: 'Hatshepsut gobernó Egipto por derecho propio, vistiéndose a menudo con atributos masculinos del faraón.' },
      { id: 10, text: "¿Qué mujer fue la primera en ganar un Premio Pulitzer de ficción?", options: ["Toni Morrison", "Pearl S. Buck", "Edith Wharton"], correctAnswer: "Edith Wharton", explanation: 'Edith Wharton ganó el Pulitzer en 1921 por "La Edad de la Inocencia."' },
      { id: 11, text: "¿Qué mujer ganó la medalla de oro olímpica en gimnasia en 1976 con una puntuación perfecta (10)?", options: ["Nadia Comăneci", "Olga Korbut", "Mary Lou Retton"], correctAnswer: "Nadia Comăneci", explanation: 'Nadia Comăneci fue la primera gimnasta en recibir una puntuación perfecta de 10.0 en los Juegos Olímpicos.' },
      { id: 12, text: "¿Quién fue la emperatriz rusa conocida por expandir enormemente el territorio del imperio?", options: ["María Teresa I", "Isabel I", "Catalina la Grande"], correctAnswer: "Catalina la Grande", explanation: 'Catalina la Grande reinó durante la Edad de Oro de Rusia y expandió significativamente su territorio.' },
      { id: 13, text: "¿Qué científica jugó un papel clave en el descubrimiento de la estructura de doble hélice del ADN?", options: ["Rachel Carson", "Barbara McClintock", "Rosalind Franklin"], correctAnswer: "Rosalind Franklin", explanation: 'Rosalind Franklin obtuvo la famosa "Foto 51", que fue esencial para Watson y Crick.' },
      { id: 14, text: "¿Qué defensora de los derechos humanos y premio Nobel luchó por la educación de las niñas?", options: ["Rigoberta Menchú", "Aung San Suu Kyi", "Malala Yousafzai"], correctAnswer: "Malala Yousafzai", explanation: 'Malala Yousafzai ganó el Premio Nobel de la Paz en 2014 por su activismo en pro de la educación.' },
      { id: 15, text: "¿Quién es la escritora británica que creó a Peter Rabbit?", options: ["Agatha Christie", "Enid Blyton", "Beatrix Potter"], correctAnswer: "Beatrix Potter", explanation: 'Beatrix Potter es famosa por sus cuentos infantiles y su personaje Peter Rabbit.' },
      { id: 16, text: "¿Qué Reina de Inglaterra reinó durante la derrota de la Armada Invencible española?", options: ["Ana I", "María I", "Isabel I"], correctAnswer: "Isabel I", explanation: 'La derrota de la Armada Invencible en 1588 ocurrió bajo el reinado de Isabel I.' },
      { id: 17, text: "¿Qué actriz, conocida por ser un ícono de la moda, co-inventó una tecnología de comunicación temprana para el ejército?", options: ["Marlene Dietrich", "Ava Gardner", "Hedy Lamarr"], correctAnswer: "Hedy Lamarr", explanation: 'Hedy Lamarr co-inventó un sistema de comunicación de espectro ensanchado que es la base del Wi-Fi y el Bluetooth.' },
      { id: 18, text: "¿Cuál fue la primera mujer astronauta en ir al espacio?", options: ["Svetlana Savítskaya", "Sally Ride", "Valentina Tereshkova"], correctAnswer: "Valentina Tereshkova", explanation: 'Valentina Tereshkova voló sola en la misión Vostok 6 en 1963.' },
      { id: 19, text: "¿Qué activista estadounidense luchó por el sufragio femenino a principios del siglo XX?", options: ["Gloria Steinem", "Eleanor Roosevelt", "Susan B. Anthony"], correctAnswer: "Susan B. Anthony", explanation: 'Susan B. Anthony fue una figura fundamental en el movimiento por el derecho al voto de las mujeres en EE. UU.' },
      { id: 20, text: "¿Qué cantante fue la primera mujer en ingresar al Salón de la Fama del Rock and Roll?", options: ["Tina Turner", "Janis Joplin", "Aretha Franklin"], correctAnswer: "Aretha Franklin", explanation: 'Aretha Franklin fue la primera mujer en ser incluida en el Salón de la Fama del Rock and Roll en 1987.' }
    ]]
  ]);

  //Devuelve la lista de temas para el ListaTemasComponent

  public getAvailableTemas(): Temas[] {
    return this.availableTemas;
  }

  /**
   * Almacena el ID del tema elegido por el usuario.
   * @param temaId El ID del tema seleccionado.
   */
  public setSelectedTemaId(temaId: string): void {
    this.selectedTemaId = temaId;
    this.resetQuizState();
  }

  //Devuelve las preguntas del tema seleccionado actualmente.

  getQuestions(): Question[] {
    // Usar el nombre de la propiedad CORRECTO: selectedTemaId
    // Si selectedTemaId es null, no podemos buscar preguntas.
    if (!this.selectedTemaId) {
      console.error('QuizService: No se ha seleccionado ningún tema');
      return [];
    }

    const questionsForTopic = this.availableQuestions.get(this.selectedTemaId);

    // Verifica el resultado y devuelve el array (o un array vacío si es undefined)
    const result = questionsForTopic || [];

    console.log('QuizService: Tema activo: ', this.selectedTemaId);
    console.log('QuizService: Preguntas encontradas:', result.length);

    return result;
  }

  public getTotalQuestions(): number {
    return this.getQuestions().length;
  }

  public setFinalScore(score: number): void {
    this.finalScore = score;
  }

  public getFinalScore(): number {
    return this.finalScore;
  }

  // NUEVO MÉTODO: Añade los detalles de una pregunta al historial
  public addQuestionToHistory(
    question: Question,
    selectedAnswer: string | null
  ): void {
    const isCorrect = selectedAnswer === question.correctAnswer;

    const detail: QuizResultDetail = {
      question: question,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect
    };

    this.quizHistory.push(detail);
  }

  // NUEVO MÉTODO: Obtiene el historial para la pantalla de resultados
  public getQuizHistory(): QuizResultDetail[] {
    return this.quizHistory;
  }

  // CRÍTICO: Asegurarse de que el historial se limpia al inicio
  public resetQuizState(): void {
    this.finalScore = 0;
    this.quizHistory = []; // ¡Limpiar el historial!
  }
}