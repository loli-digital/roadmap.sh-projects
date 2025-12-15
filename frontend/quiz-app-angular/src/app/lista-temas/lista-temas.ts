import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizService } from '../core/quiz.service';
import { Temas } from '../models/temas';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-temas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-temas.html',
  styleUrl: './lista-temas.css'
})
export class ListaTemasComponent implements OnInit {

  private quizService = inject(QuizService);
  private router = inject(Router);

  public availableTemas: Temas[] = [];

  ngOnInit(): void {
    // Obtenemos los temas disponibles del servicio
    this.availableTemas = this.quizService.getAvailableTemas();
  }

  /**
   * Se llama cuando el usuario selecciona un tema.
   * Guarda el ID del tema en el servicio y navega a la prueba.
   * @param temaId El ID único del tema seleccionado (ej: 'animales').
   */
  public selectTema(temaId: string): void {
    console.log('Tema seleccionado:', temaId);
    
    // 1. Guarda la selección en el Servicio
    this.quizService.setSelectedTemaId(temaId); 
    
    // 2. Navega a la ruta de la prueba (/quiz)
    this.router.navigate(['/quiz']); 
  }
}