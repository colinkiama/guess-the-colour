import { Application, Container, Text, TextStyle } from "pixi.js";
import { ColorStrings } from "../consts/Colors";
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
      fill: ColorStrings.WHITE,
    });

    centerText(titleText, this.app);
    titleText.y = 40;

    let gameStatsContainer = this.createStatsText();
    gameStatsContainer.y = this.app.screen.height / 2;
    gameStatsContainer.pivot.y = gameStatsContainer.height / 2;

    let playAgainButton = this.addPlayAgainButton();

    this.addChild(titleText, gameStatsContainer, playAgainButton);
  }

  addPlayAgainButton(): Text {
    let playAgainText = new Text("Play Again", {
      fill: ColorStrings.WHITE,
      align: "center",
      fontSize: 20,
      fontWeight: "700",
    });

    playAgainText.interactive = true;
    playAgainText.cursor = "pointer";

    centerText(playAgainText, this.app);
    playAgainText.y = this.app.screen.height - 100;

    playAgainText.on(
      "pointerover",
      () => (playAgainText.style.fill = ColorStrings.RED)
    );

    playAgainText.on(
      "pointerout",
      () => (playAgainText.style.fill = ColorStrings.WHITE)
    );

    playAgainText.once("pointerdown", () => this.playAgainCallback());
    return playAgainText;
  }

  createStatsText(): Container<Text> {
    const statsTextMargin = 8;

    let statsTextStyle = new TextStyle({
      align: "center",
      fontFamily: "Arial",
      fill: ColorStrings.WHITE,
      fontSize: 20,
    });

    let scoreText = this.createScoreText(statsTextStyle, 0);

    let guessesMadeText = this.createGuessesMadeText(
      statsTextStyle,
      scoreText.height + statsTextMargin
    );

    let accuracyText = this.createAccuracyText(
      statsTextStyle,
      guessesMadeText.y + guessesMadeText.height + statsTextMargin
    );

    let gameStatsContainer = new Container<Text>();
    gameStatsContainer.addChild(scoreText, guessesMadeText, accuracyText);

    return gameStatsContainer;
  }

  createAccuracyText(statsTextStyle: TextStyle, y: number): Text {
    let accuracy = calculateAccuracy(this.results);
    let accuracyText = new Text(`Accuracy: ${accuracy}%`, statsTextStyle);
    centerText(accuracyText, this.app);
    accuracyText.y = y;

    return accuracyText;
  }

  createGuessesMadeText(statsTextStyle: TextStyle, y: number) {
    let guessesMadeText = new Text(
      `Guesses: ${this.results.totalGuesses}`,
      statsTextStyle
    );

    centerText(guessesMadeText, this.app);
    guessesMadeText.y = y;

    return guessesMadeText;
  }

  createScoreText(textStyle: TextStyle, y: number) {
    let scoreText = new Text(
      `Score: ${this.results.correctGuesses}`,
      textStyle
    );

    centerText(scoreText, this.app);
    scoreText.y = y;

    return scoreText;
  }
}

function centerText(textObject: Text, app: Application) {
  textObject.x = app.screen.width / 2;
  textObject.anchor.x = 0.5;
}

function calculateAccuracy(results: GuessData) {
  if (results.totalGuesses < 1) {
    return 0;
  }

  return Math.floor((results.correctGuesses / results.totalGuesses) * 100);
}
