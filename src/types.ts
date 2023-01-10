// Incorrect guesses and correct guess rate can be
// inferred from correct guesses and total guesses.
export type GameResults = {
  finalScore: number;
  correctGuesses: number;
  totalGuesses: number;
};

export type SelectedColorCallbackFunction = (color: number) => void;
