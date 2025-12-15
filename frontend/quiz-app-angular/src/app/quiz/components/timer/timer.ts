
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule],
  template: `
        <section class="timer-container p-3 w-32 mx-auto rounded-full shadow-lg bg-white dark:bg-gray-800 flex items-center justify-center border-4 border-indigo-400" [class.danger]="isTimeLow">
          <span class="timer-display text-2xl font-extrabold text-indigo-700 dark:text-indigo-300 tabular-nums">
            {{ minutes }}:{{ seconds }} 
          </span>
        </section>
    `,
  styleUrl: './timer.css'
})
export class TimerComponent implements OnChanges, OnInit, OnDestroy {

  @Input() timeLimit: number = 30;

  // La variable que cambiará en cada pregunta
  @Input() questionIndex: number = 0;

  @Output() timeUp = new EventEmitter<void>();

  @Input() stopTimerSignal: boolean = false;

  public timeLeft: number = 0;
  private intervalId: any = null;
  private timerSubscription: any;

  constructor(private cd: ChangeDetectorRef) { }

  // Llama al reset inicial.
  ngOnInit(): void {
    this.resetTimer();
  }

  // Limpia el intervalo si el componente es destruido (buena práctica).
  ngOnDestroy(): void {
    this.stopInterval();
  }

  // Llama al reset si el índice de la pregunta cambia.
  ngOnChanges(changes: SimpleChanges): void {

    // Si la propiedad 'questionIndex' ha cambiado, independientemente de si es la primera vez o de su valor anterior, simplemente reiniciamos.

    if (changes['questionIndex']) {

      this.resetTimer();
    }

    // Lógica de detención
    if (changes['stopTimerSignal'] && this.stopTimerSignal) {
      this.stopInterval();
    }
  }

  // Método para detener el temporizador
    private stopInterval(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

  private clearTimer(): void {
    if (this.timerSubscription) {
      clearInterval(this.timerSubscription);
    }
  }

  // Destruye el anterior y crea uno nuevo.
  private resetTimer(): void {
    this.clearTimer();

    this.timeLeft = this.timeLimit;

    //Inicia el intervalo y guarda la referencia
    this.timerSubscription = setInterval(() => {
      this.decrementTimer();
    }, 1000);
  }

  private decrementTimer(): void {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      this.cd.detectChanges();
    } else {
      this.clearTimer(); // Limpia el intervalo al llegar a 0
      this.timeUp.emit(); // Emite el evento para avanzar
    }
  }

  public get minutes(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    return minutes.toString().padStart(2, '0');
  }

  public get seconds(): string {
    const seconds = this.timeLeft % 60;
    return seconds.toString().padStart(2, '0');
  }

  public get isTimeLow(): boolean {
    return this.timeLeft <= 10;
  }
}