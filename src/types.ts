export type ColorSelectedCallbackFunction = (color: number) => void;

// Incorrect guesses and correct guess rate can be
// inferred from correct guesses and total guesses.
export type GuessData = {
  correctGuesses: number;
  totalGuesses: number;
};

export type StatusUpdate = {
  score?: number;
  timeLeft?: number;
};

export type GameTimerServiceParams = {
  sessionLength: number;
  tickInterval: number;
  tickCallback: (timeLeft: number) => void;
  timerCompletedCallback: () => void;
};
