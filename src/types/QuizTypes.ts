export interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  fact?: string;
}

export interface Result {
  question: string;
  selectedAnswer: string;
  isCorrect: boolean;
}