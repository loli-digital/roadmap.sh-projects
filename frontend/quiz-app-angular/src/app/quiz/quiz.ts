import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../core/quiz.service';
import { Question } from '../models/question';

import { TimerComponent } from './components/timer/timer';
import { QuestionCardComponent } from './components/question-card/question-card';
import { ProgressBarComponent } from './components/progress-bar/progress-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'quiz-app',
  standalone: true,
  imports: [CommonModule, TimerComponent, QuestionCardComponent, ProgressBarComponent],
  templateUrl: './quiz.html',
  styleUrl: './quiz.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class QuizComponent implements OnInit {

  //Inyecciones de dependencias
  private router = inject(Router);
  private quizService = inject(QuizService);
  private cd = inject(ChangeDetectorRef);

  public timerShouldStop: boolean = false;

  //Propiedades del juego
  public questions: Question[] = [];
  public currentQuestion: Question | undefined;
  public currentQuestionIndex: number = 0;
  public totalQuestions: number = 0;
  public score: number = 0;
  public quizKey: number = 0;
  public timerKey: number = 0;

  public returnToTopics(): void {
    // Opcional pero recomendado: Lógica de limpieza
    // Si deseas que el quiz actual se reinicie o se borre el progreso
    this.quizService.resetQuizState(); 

    // Detener el temporizador si está corriendo
    this.timerShouldStop = true;

    // Navega a la pantalla de temas
    this.router.navigate(['/lista-temas']);
  }

  // Para evitar hacer doble clic o interacciones después de responder
  public hasAnswered: boolean = false;

  ngOnInit(): void {
    this.questions = this.quizService.getQuestions();
    this.totalQuestions = this.questions.length;

    // Cuando el quiz se inicializa o comienza:
    this.quizService.startQuiz();
    this.updateCurrentQuestion();

    // 1. CRÍTICO: Verificar si hay preguntas inmediatamente
    if (this.totalQuestions === 0) {
      console.error("No hay preguntas cargadas. Volviendo al selector de temas.");
      this.router.navigate(['/lista-temas']);
      return;
    }

    // 2. Iniciar el quiz SÓLO si hay preguntas
    this.quizService.resetQuizState();
    this.updateCurrentQuestion();

    // 3. Forzar la detección de cambios para renderizar la primera pregunta y el temporizador
    this.cd.detectChanges();

  }

  // MANEJO DE RESPUESTAS Y FLUJO 

  private goToNextStep(): void {
    const nextIndex = this.currentQuestionIndex + 1;

    // 1. Ocultamos la pregunta actual.
    this.currentQuestion = undefined;

    // 2. Mantenemos el índice actualizado.
    this.currentQuestionIndex = nextIndex;

    // Manejar el final del quiz.
    if (this.currentQuestionIndex >= this.totalQuestions) {
      this.finishQuiz();
      return;
    }

    setTimeout(() => {
      // Reiniciar la señal de detención del temporizador.
      this.timerShouldStop = false;

      // Reiniciar la bandera
      this.hasAnswered = false;

      // Cargar la nueva pregunta
      this.updateCurrentQuestion();

      // Forzamos el redibujado
      this.cd.detectChanges();
    }, 0);
  }

  //Gestiona la respuesta recibida del QuestionCardComponent o el evento de tiempo agotado

  public handleAnswer(selectedAnswer?: string): void {
    // Si ya ha respondido (o tiempo expiró), ignora clicks.
    if (this.hasAnswered) return;

    // DETENER EL TEMPORIZADOR INMEDIATAMENTE
    this.timerShouldStop = true;

    // Registrar la respuesta ANTES del setTimeout(0)
    if (this.currentQuestion) {
      this.quizService.addQuestionToHistory(this.currentQuestion, selectedAnswer || null);
    }

    // El resto de tu lógica se envuelve en setTimeout(0) como acordamos:
    setTimeout(() => {

      // 1. Establecemos hasAnswered = true 
      this.hasAnswered = true;

      // 2. Revisar puntuación
      if (selectedAnswer && this.currentQuestion && selectedAnswer === this.currentQuestion.correctAnswer) {
        this.score++;
      }

      // 3. Forzamos la detección de cambios.
      this.cd.detectChanges();

      // 4. Esperar 500ms y avanzar
      setTimeout(() => {
        this.goToNextStep();
      }, 500);

    }, 0); // Separación de ciclo
  }

  public handleTimeUp(): void {
    if (this.hasAnswered) return;

    if (this.currentQuestion) {
      this.quizService.addQuestionToHistory(this.currentQuestion, null);
    }

    // Esperar 500ms y avanzar
    setTimeout(() => {
      this.goToNextStep();
    }, 500);
  }


  // Carga la siguiente pregunta o finaliza el juego.

  private updateCurrentQuestion(): void {
    if (this.currentQuestionIndex < this.totalQuestions) {
      // CRÍTICO: Creamos una COPIA DEL OBJETO para forzar el reinicio de la QuestionCard
      this.currentQuestion = { ...this.questions[this.currentQuestionIndex] };
    } else {
      this.currentQuestion = undefined;
      this.finishQuiz();
    }
  }

  // Finaliza el juego, guarda la puntuación y navega a Resultados.

  private finishQuiz(): void {

    this.quizService.endQuiz();

    // GUARDA LA PUNTUACIÓN FINAL EN EL SERVICIO
    this.quizService.setFinalScore(this.score);

    // Navega a la pantalla de resultados
    this.router.navigate(['/results']);
  }

  public goToNextQuestion(): void {
    // Lógica para incrementar el índice o pasar a resultados
    this.currentQuestionIndex++;
  }
}