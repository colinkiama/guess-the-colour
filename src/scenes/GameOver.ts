import { Application, Container, Text } from "pixi.js";
import { GuessData } from "../types";
import Scene from "./Scene";

export default class GameOver extends Scene {
  private results: GuessData;
  private playAgainCallback: () => void;
  private topAreaTextContainer!: Container<Text>;
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

  start() {
    let titleText = new Text("Game Over", {
      fontFamily: "Arial",
      fontSize: 40,
      fontWeight: "700",
      align: "center",
      fill: "#ffffff",
    });

    titleText.anchor.x = 0.5;
    titleText.x = this.app.screen.width / 2;

    this.topAreaTextContainer = new Container<Text>();
    this.topAreaTextContainer.addChild(titleText);
    this.topAreaTextContainer.y = 40;
    this.app.stage.addChild(this.topAreaTextContainer);
  }
}
