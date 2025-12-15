import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css'
})
export class ProgressBarComponent {

  @Input() currentQuestionIndex: number = 0;

  @Input() totalQuestions: number = 0;

  /**
   * Calcula el porcentaje de la prueba completada.
   * Se añade +1 al índice porque se suele contar desde 1 para el usuario final.
   * @returns El porcentaje como número entero (0-100). <--- Aquí sí es correcto (dentro de JSDoc)
   */

  public get progressPercentage(): number {

    if (this.totalQuestions === 0) {
      return 0;
    }

    const percentage = (this.currentQuestionIndex / this.totalQuestions) * 100;

    if (this.currentQuestionIndex >= this.totalQuestions) {
      return 100;
    }

    return Math.floor(percentage);
  }
}
