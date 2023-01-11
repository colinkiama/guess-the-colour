import { Application, Container, Text, TextStyle } from "pixi.js";
import { GuessData } from "../types";
import Scene from "./Scene";

export default class GameOver extends Scene {
  private results: GuessData;
  private playAgainCallback: () => void;
  private gameOverDisplayobjects!: Container;

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

    centerText(titleText, this.app);

    let gameStatsContainer = this.createStatsText();

    let topAreaTextContainer = new Container();
    topAreaTextContainer.y = 40;
    topAreaTextContainer.addChild(titleText, gameStatsContainer);

    let playAgainButton = this.addPlayAgainButton();

    this.gameOverDisplayobjects = new Container();
    this.gameOverDisplayobjects.addChild(topAreaTextContainer, playAgainButton);

    this.app.stage.addChild(this.gameOverDisplayobjects);
  }

  addPlayAgainButton(): Text {
    let playAgainText = new Text("Play Again", {
      fill: "#ffffff",
      align: "center",
      fontSize: 20,
      fontWeight: "700",
    });

    centerText(playAgainText, this.app);
    playAgainText.y = this.app.screen.height - 100;
    return playAgainText;
  }

  createStatsText(): Container<Text> {
    const statsTextMargin = 8;

    let statsTextStyle = new TextStyle({
      align: "center",
      fontFamily: "Arial",
      fill: "#ffffff",
      fontSize: 20,
    });

    let scoreText = new Text(
      `Score: ${this.results.correctGuesses}`,
      statsTextStyle
    );

    centerText(scoreText, this.app);

    let guessesMadeText = new Text(
      `Guesses: ${this.results.totalGuesses}`,
      statsTextStyle
    );

    centerText(guessesMadeText, this.app);
    guessesMadeText.y = scoreText.height + statsTextMargin;

    let accuracyText = new Text(
      `Accuracy: ${Math.floor(
        (this.results.correctGuesses / this.results.totalGuesses) * 100
      )}%`,
      statsTextStyle
    );

    centerText(accuracyText, this.app);
    accuracyText.y =
      guessesMadeText.y + guessesMadeText.height + statsTextMargin;

    let gameStatsContainer = new Container<Text>();
    gameStatsContainer.y = 60;
    gameStatsContainer.addChild(scoreText, guessesMadeText, accuracyText);

    return gameStatsContainer;
  }
}

function centerText(textObject: Text, app: Application) {
  textObject.x = app.screen.width / 2;
  textObject.anchor.x = 0.5;
}
