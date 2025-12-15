import { Question } from './question';

export interface QuizResultDetail {
  question: Question;
  selectedAnswer: string | null;
  isCorrect: boolean;
}