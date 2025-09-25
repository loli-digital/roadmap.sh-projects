import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Flash cards');

  indiceActual = signal(0);
  mostrarRespuesta = signal(false);

  get progreso(): number {
    return ((this.indiceActual() + 1) / this.flashcards.length) * 100;
  }

  flashcards = [
    { pregunta: '¿Qué tipo de lenguaje es JavaScript? ', respuesta: 'Es un lenguaje de programación interpretado, dinámico y orientado a objetos' },
    { pregunta: '¿Qué significa NaN en JavaScript? ', respuesta: '"Not a Number", indica un valor que no es numérico' },
    { pregunta: '¿Qué hace typeof?', respuesta: 'Devuelve el tipo de dato de una variable ' },
    { pregunta: '¿Qué es una función anónima?', respuesta: 'Una función sin nombre, asignada normalmente a una variable' },
    { pregunta: '¿Qué es el hoisting?', respuesta: 'Es el comportamiento por el cual las declaraciones se mueven al inicio del ámbito' },
    { pregunta: '¿Qué diferencia hay entre let, var y const? ', respuesta: 'var tiene ámbito de función, let y const de bloque. const no puede reasignarse' },
    { pregunta: '¿Qué es una promesa (Promise) en JavaScript?', respuesta: 'Un objeto que representa la eventual resolución o rechazo de una operación asíncrona' },
    { pregunta: '¿Qué significa this en JavaScript?', respuesta: 'Hace referencia al objeto desde el cual se invoca una función' },
    { pregunta: '¿Qué hace JSON.stringify()?', respuesta: 'Convierte un objeto JavaScript en una cadena JSON' },
    { pregunta: '¿Qué hace JSON.parse()?', respuesta: 'Convierte una cadena JSON en un objeto JavaScript' },
    { pregunta: '¿Qué es el DOM?', respuesta: 'Document Object Model, una representación estructurada del HTML' },
    { pregunta: '¿Qué es un callback?', respuesta: 'Una función que se pasa como argumento a otra función' },
    { pregunta: '¿Qué es event.preventDefault()?', respuesta: 'Evita el comportamiento por defecto de un evento' },
    { pregunta: '¿Qué hace setTimeout()?', respuesta: 'Ejecuta una función después de un tiempo determinado' },
    { pregunta: '¿Qué hace setInterval()?', respuesta: 'Ejecuta una función repetidamente cada cierto intervalo de tiempo' },
    { pregunta: '¿Qué es null en JavaScript?', respuesta: 'Un valor que representa la ausencia intencionada de un objeto' },
    { pregunta: '¿Qué es undefined?', respuesta: 'Una variable declarada pero sin valor asignado' },
    { pregunta: '¿Qué es el operador ternario?', respuesta: 'Una forma corta de escribir una condición: condición ? valor1 : valor2' },
    { pregunta: '¿Qué es el strict mode?', respuesta: 'Modo que impone reglas más estrictas para escribir JavaScript' },
    { pregunta: '¿Qué hace Array.map()?', respuesta: 'Crea un nuevo array aplicando una función a cada elemento del original' }
  ];

  anterior() {
    if (this.indiceActual() > 0) {
      this.indiceActual.update(i => i - 1);
      this.mostrarRespuesta.set(false);
    }
  }

  siguiente() {
    if (this.indiceActual() < this.flashcards.length - 1) {
      this.indiceActual.update(i => i + 1);
      this.mostrarRespuesta.set(false);
    }
  }

  btnMostrarRespuesta() {
    this.mostrarRespuesta.update(valor => !valor);
  }
}
