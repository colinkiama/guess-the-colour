import { GameTimerServiceParams } from "../types";

export default class GameTimerService {
  private tickIntervalTimerId!: number;
  private gameSessionTimerID!: number;
  private sessionLength: number;
  private tickInterval: number;
  private timeLeft: number;
  private tickCallback: (timeLeft: number) => void;
  private timerCompletedCallback: () => void;

  constructor(params: GameTimerServiceParams) {
    this.sessionLength = params.sessionLength;
    this.timeLeft = params.sessionLength;
    this.tickInterval = params.tickInterval;
    this.tickCallback = params.tickCallback;
    this.timerCompletedCallback = params.timerCompletedCallback;
  }

  start() {
    this.tickIntervalTimerId = setInterval(() => {
      this.timeLeft -= this.tickInterval;
      this.tickCallback(this.timeLeft);
    }, this.tickInterval);

    this.gameSessionTimerID = setTimeout(() => {
      clearInterval(this.tickIntervalTimerId);
      this.timeLeft = 0;
      this.timerCompletedCallback();
      clearTimeout(this.gameSessionTimerID);
    }, this.sessionLength);
  }
}
