
import { Routes } from '@angular/router';

// Usamos loadComponent para cargar los componentes de ruta de forma perezosa (lazy-loading)
export const routes: Routes = [
  
  // 1. RUTA DE INICIO (Redirección)
  // Cuando el usuario visita la raíz ('/'), redirige a la selección de temas.
  { path: '', redirectTo: '/lista-temas', pathMatch: 'full' }, 
  
  // 2. RUTA DE SELECCIÓN DE TEMAS
  // Carga el componente que tiene el selector de temas.
  {
    path: 'lista-temas',
    loadComponent: () => import('./lista-temas/lista-temas').then(m => m.ListaTemasComponent)
  },
  
  // 3. RUTA DEL JUEGO (QUIZ)
  // Carga el componente principal del juego.
  {
    path: 'quiz',
    loadComponent: () => import('./quiz/quiz').then(m => m.QuizComponent)
  },

  // 4. RUTA DE RESULTADOS
  // Carga el componente que muestra la puntuación final.
  {
    path: 'results',
    loadComponent: () => import('./result/result').then(m => m.ResultComponent)
  },

  // 5. RUTA CÓMODÍN (Opcional, para manejar errores 404)
  // Si se introduce cualquier otra URL, redirige de vuelta a la selección de temas.
  { path: '**', redirectTo: '/lista-temas' }
];