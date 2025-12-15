import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { Component, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes) 
  ]
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  standalone: true,
  providers: [],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('quiz-app');
}
