import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../core/quiz.service';
import { QuizResultDetail } from '../models/quiz-result-detail';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.html',
  styleUrl: './result.css'
})
export class ResultComponent implements OnInit {

  private quizService = inject(QuizService);
  private router = inject(Router);

  public goToTopics(): void {
    // Redirige a la ruta donde están tus tarjetas de temas
    this.router.navigate(['/lista-temas']); 
  }

  public finalScore: number = 0;
  public totalQuestions: number = 0;

  public quizHistory: QuizResultDetail[] = [];

  public tiempoFormateado: string = '';

  ngOnInit(): void {

    const totalTime = this.quizService.getTotalTime();
    if (totalTime !== null) {
      this.tiempoFormateado = this.formatTime(totalTime);
    }

    // 1. Obtiene los datos finales del QuizService
    this.finalScore = this.quizService.getFinalScore();
    this.totalQuestions = this.quizService.getTotalQuestions();
    this.quizHistory = this.quizService.getQuizHistory();

    // Protección: Si no hay preguntas (evita división por cero y acceso directo)
    if (this.totalQuestions === 0) {
      this.router.navigate(['/lista-temas']);
    }
  }

  private formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Calcula el porcentaje de aciertos.
   */
  public get percentageScore(): number {
    if (this.totalQuestions === 0) return 0;
    // Redondeamos para que el número sea limpio
    return Math.round((this.finalScore / this.totalQuestions) * 100);
  }
}