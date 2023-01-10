export type SelectedColorCallbackFunction = (color: number) => void;

// Incorrect guesses and correct guess rate can be
// inferred from correct guesses and total guesses.
export type GuessData = {
  correctGuesses: number;
  totalGuesses: number;
};
