import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy,
  ChangeDetectorRef // <-- ¡NUEVA INYECCIÓN!
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Question } from '../../../models/question';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question-card.html',
  styleUrl: './question-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionCardComponent implements OnChanges {

  @Input() hasAnswered: boolean = false;

  // Usamos '!' para asegurar que el padre (QuizComponent) la proporcionará
  @Input() question!: Question;

  @Input() correctAnswer: string | null = null;

  @Output() answerSelected = new EventEmitter<string>();

  public selectedAnswerText: string | null = null;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges): void {
    // Si la pregunta CAMBIA (ya que la enviamos como una copia nueva)
    if (changes['question']) {

      // CRÍTICO: Reiniciar el estado de la vista local
      this.selectedAnswerText = null;

      // Forzar a QuestionCard a revisar su estado (necesario por ChangeDetectionStrategy.OnPush)
      this.cd.markForCheck();
    }
    // Si cambia 'hasAnswered' o 'correctAnswer', no necesitamos forzar el reset, solo la detección:
    else if (changes['hasAnswered'] || changes['correctAnswer']) {
      // CRÍTICO: Usar markForCheck en lugar de detectChanges
      this.cd.markForCheck();
    }
  }

  /**
   * Maneja el clic en una opción.
   * 1. Registra la respuesta (para la accesibilidad y el estilo visual).
   * 2. Emite el evento al padre solo si no se ha respondido antes.
   * @param answer El texto de la opción seleccionada.
   */
  public selectAnswer(answer: string): void {
    if (this.hasAnswered) {
      return;
    }

    // 1. Marca el estado y la respuesta
    this.selectedAnswerText = answer;

    // 2. CRÍTICO: Indica a Angular que revise este componente en el siguiente ciclo.
    this.cd.markForCheck(); // Usar markForCheck

    // 3. Emite el evento al padre (el padre manejará el hasAnswered=true)
    this.answerSelected.emit(answer);
  }

  public getButtonClass(option: string): string {
    // Esto ya fue respondido, ahora aplicamos los colores:

    // 1. Siempre resaltamos la respuesta CORRECTA (verde)
    if (option === this.correctAnswer) {
      // Usamos un color base fuerte para la respuesta correcta
      return 'bg-green-500 text-white border-green-700';
    }

    return 'bg-gray-100 text-gray-500 border-gray-300';
  }

  /**
   * Determina si un botón está actualmente seleccionado para los estilos y ARIA.
   * @param option El texto de la opción.
   * @returns Verdadero si esta opción fue la seleccionada.
   */
  public isSelected(option: string): boolean {
    return this.selectedAnswerText === option;
  }
}
