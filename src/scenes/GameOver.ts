import { Application, Container, Text, TextStyle } from "pixi.js";
import { GuessData } from "../types";
import { Scene } from "./Scene";

export default class GameOver extends Scene {
  private results: GuessData;
  private playAgainCallback: () => void;

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
    titleText.y = 40;

    let gameStatsContainer = this.createStatsText();
    gameStatsContainer.y = this.app.screen.height / 2 - 40;
    gameStatsContainer.pivot.y = gameStatsContainer.height / 2;

    let topAreaTextContainer = new Container();
    topAreaTextContainer.addChild(titleText, gameStatsContainer);

    let playAgainButton = this.addPlayAgainButton();

    this.addChild(topAreaTextContainer, playAgainButton);
  }

  addPlayAgainButton(): Text {
    let playAgainText = new Text("Play Again", {
      fill: "#ffffff",
      align: "center",
      fontSize: 20,
      fontWeight: "700",
    });

    playAgainText.interactive = true;

    centerText(playAgainText, this.app);
    playAgainText.y = this.app.screen.height - 100;

    playAgainText.on(
      "pointerover",
      () => (playAgainText.style.fill = "#ff0000")
    );

    playAgainText.on(
      "pointerout",
      () => (playAgainText.style.fill = "#ffffff")
    );

    playAgainText.once("pointerdown", () => this.playAgainCallback());
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

    let accuracy =
      this.results.totalGuesses > 0
        ? Math.floor(
            (this.results.correctGuesses / this.results.totalGuesses) * 100
          )
        : 0;

    let accuracyText = new Text(`Accuracy: ${accuracy}%`, statsTextStyle);

    centerText(accuracyText, this.app);
    accuracyText.y =
      guessesMadeText.y + guessesMadeText.height + statsTextMargin;

    let gameStatsContainer = new Container<Text>();
    gameStatsContainer.addChild(scoreText, guessesMadeText, accuracyText);

    return gameStatsContainer;
  }
}

function centerText(textObject: Text, app: Application) {
  textObject.x = app.screen.width / 2;
  textObject.anchor.x = 0.5;
}
