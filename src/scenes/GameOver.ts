import { Application, Container, Text } from "pixi.js";
import { GuessData } from "../types";
import Scene from "./Scene";

export default class GameOver extends Scene {
  private results: GuessData;
  private playAgainCallback: () => void;
  private resultsTextContainer!: Container<Text>;
  private playAgainTextButton!: Text;

  constructor(
    app: Application,
    results: GuessData,
    playAgainCallback: () => void
  ) {
    super(app);
    this.results = results;
    this.playAgainCallback = playAgainCallback;
  }

  render() {}
}
