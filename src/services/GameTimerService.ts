export default class GameTimerService {
  private tickIntervalTimerId!: number;
  private gameSessionTimerID!: number;
  private sessionLength: number;
  private tickInterval: number;
  private timeLeft: number;
  private tickCallback: (timeLeft: number) => void;
  private timerCompletedCallback: () => void;

  constructor(
    sessionLength: number,
    tickInterval: number,
    tickCallback: (timeLeft: number) => void,
    timerCompletedCallback: () => void
  ) {
    this.sessionLength = sessionLength;
    this.timeLeft = sessionLength;
    this.tickInterval = tickInterval;
    this.tickCallback = tickCallback;
    this.timerCompletedCallback = timerCompletedCallback;
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
