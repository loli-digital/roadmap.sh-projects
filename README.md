<h1>Formulario accesible</h1>
<p>Ejercicio de roadmap.sh que consiste en crear un formulario accesible</p>
<p>En este proyecto, se requiere crear una interfaz de usuario de formulario utilizando únicamente HTML y CSS. El formulario incluirá campos para un nombre completo, correo electrónico, contraseña y confirmación de contraseña, junto con un botón para alternar la visibilidad del texto de la contraseña. Además, el formulario contará con una barra de progreso de completitud y una lista de verificación de requisitos que se deben cumplir para que el formulario alcance el 100 % de completitud. Si bien esta versión del formulario no será funcional, será un componente de interfaz de usuario estático que se puede mejorar con JavaScript en el futuro.</p>
<p>El objetivo de este proyecto no es solo ayudarte a practicar HTML y CSS, sino también enfocarte en crear un formulario accesible que sea fácil de usar para todos los usuarios, incluidos aquellos con discapacidades. </p>
<h2>Pautas de accesibilidad</h2>
<ul>
  <li>Etiquetado : asegúrese de que cada campo de formulario tenga un <label>elemento correspondiente que esté claramente asociado con el campo que utiliza el foratributo.</li>
  <li>Estado de enfoque : diseñe el estado de enfoque de cada campo de entrada para que los usuarios que navegan con un teclado puedan ver fácilmente qué campo está activo actualmente.</li>
  <li>Mensajes de error : considere agregar espacio para mensajes de error que se puedan mostrar cuando un usuario ingresa datos no válidos. Estos mensajes deben estar claramente asociados con el campo de entrada correspondiente.</li>
  <li>Atributos ARIA : utilice atributos ARIA (Aplicaciones de Internet enriquecidas accesibles) cuando sea necesario, como aria-requiredpara campos obligatorios y aria-invalidpara campos con errores.</li>
  <li>Contraste de color : asegúrese de que el contraste de color entre el texto y el fondo sea suficiente para cumplir con los estándares WCAG (Pautas de accesibilidad al contenido web), haciendo que el formulario sea legible para usuarios con discapacidades visuales.</li>
  <li>Elementos interactivos : asegúrese de que el botón para mostrar/ocultar la contraseña sea accesible a través del teclado y los lectores de pantalla, proporcionando información clara sobre el estado actual (por ejemplo, “La contraseña está oculta” o “La contraseña es visible”).</li>
</ul>
<p>Una vez hecho esto, puede probar la interfaz de usuario del formulario usando un lector de pantalla o extensiones de navegador como Axe o Lighthouse para verificar problemas de accesibilidad y realizar los ajustes necesarios.</p>
<a href="https://roadmap.sh/projects/accessible-form-ui" target="_blank">Enlace al ejercicio</a>
<h2>Resultado:</h2>
<br>
<img src="https://github.com/loli-digital/accessible-form-ui-roadmap/blob/main/formulario.png" alt="Resultado del ejercicio">
