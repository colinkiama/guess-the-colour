import { GuessData } from "../types";

export default class GuessService {
  data: GuessData;
  correctAnswer: number;

  constructor() {
    this.data = {
      correctGuesses: 0,
      totalGuesses: 0,
    };

    this.correctAnswer = -1;
  }

  guess(answer: number) {
    if (answer === this.correctAnswer) {
      this.data.correctGuesses++;
    }

    this.data.totalGuesses++;
  }

  setAnswer(nextAnswer: number) {
    this.correctAnswer = nextAnswer;
  }
}
