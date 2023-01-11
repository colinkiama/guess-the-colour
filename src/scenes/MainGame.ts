import ColorButtonStack from "../components/ColorButtonStack";
import StatusFields from "../components/StatusFields";
import ColorAnswerIndicator from "../components/ColorAnswerIndicator";
import { Application, Text } from "pixi.js";
import { fetchRandomNumbers } from "../api/RandomNumber";
import { COLOR_CHOICES } from "../consts/Colors";
import GuessService from "../services/guessService";
import { StatusUpdateType } from "../consts/StatusUpdateType";
import GameTimerService from "../services/GameTimerService";
import { GuessData, StatusUpdate } from "../types";
import { Scene } from "./Scene";

// const GAME_TIME = 120000; // In milliseconds
const GAME_TIME = 10000; // In milliseconds
const GAME_TIME_UPDATE_INTERVAL = 500; // In milliseconds

export default class MainGame extends Scene {
  private colorButtonStack!: ColorButtonStack;
  private colorAnswerIndicator!: ColorAnswerIndicator;
  private statusFields!: StatusFields;
  private generatedColorChoices!: number[];
  private guessService!: GuessService;
  private gameTimerService!: GameTimerService;
  private gameOverCallback: (results: GuessData) => void;
  private revealingAnswer: boolean = false;
  private loadingText!: Text;

  constructor(
    app: Application,
    gameOverCallback: (results: GuessData) => void
  ) {
    super(app);
    this.gameOverCallback = gameOverCallback;
  }

  async start() {
    // TODO: Handle potential errors (it makes a network request)
    this.loadingText = new Text("Loading...", {
      fontFamily: "Arial",
      fontSize: 20,
      align: "center",
      fill: "#ffffff",
    });

    this.loadingText.anchor.set(0.5);
    this.loadingText.x = this.app.screen.width / 2;
    this.loadingText.y = this.app.screen.height / 2;
    this.addChild(this.loadingText);

    this.generatedColorChoices = await fetchRandomNumbers();
    this.loadingText.destroy();

    this.revealingAnswer = false;
    this.colorButtonStack = new ColorButtonStack(this.app, (color) =>
      this.handleColorSelection(color)
    );

    this.addChild(this.colorButtonStack);

    this.colorAnswerIndicator = new ColorAnswerIndicator(this.app, () =>
      this.handleCompletedResultIndicatorCycle()
    );

    this.addChild(this.colorAnswerIndicator);

    this.statusFields = new StatusFields(this.app);
    this.addChild(this.statusFields);

    this.guessService = new GuessService();
    this.guessService.setAnswer(
      this.generatedColorChoices[this.guessService.data.totalGuesses]
    );

    console.log(
      "Color Choices for this game session:",
      this.generatedColorChoices
    );

    this.gameTimerService = new GameTimerService(
      GAME_TIME,
      GAME_TIME_UPDATE_INTERVAL,
      (timeLeft: number) =>
        this.updateStatus(StatusUpdateType.TIME, { timeLeft: timeLeft }),
      () => {
        this.updateStatus(StatusUpdateType.TIME, { timeLeft: 0 });
        this.gameOverCallback(this.guessService.data);
      }
    );

    this.gameTimerService.start();
  }

  handleCompletedResultIndicatorCycle() {
    this.revealingAnswer = false;
    this.colorButtonStack.brightenColorButtons();
    this.updateStatus(StatusUpdateType.SCORE, {
      score: this.guessService.data.correctGuesses,
    });
  }

  updateStatus(updateType: string, data: StatusUpdate) {
    switch (updateType) {
      case StatusUpdateType.SCORE:
        this.statusFields.updateScore(data.score!);
        break;
      case StatusUpdateType.TIME:
        this.statusFields.updateTime(data.timeLeft!);
        break;
    }
  }

  handleColorSelection(color: number) {
    if (this.revealingAnswer) {
      return;
    }

    let playerGuess = this.determineColorSelection(color);

    let correctAnswerIndex =
      this.generatedColorChoices[this.guessService.data.totalGuesses];

    this.revealingAnswer = true;
    this.colorAnswerIndicator.cycleColorsToAnswer(
      COLOR_CHOICES[correctAnswerIndex]
    );
    this.guessService.guess(playerGuess);
    this.guessService.setAnswer(
      this.generatedColorChoices[this.guessService.data.totalGuesses]
    );
  }

  determineColorSelection(color: Number): number {
    for (let i = 0; i < COLOR_CHOICES.length; i++) {
      const choiceValue = COLOR_CHOICES[i];
      if (color === choiceValue) {
        console.log("Player colour selection data:", {
          color: color.toString(16),
          choiceIndex: i,
        });

        return i;
      }
    }

    // Player's colour selection is not in the expected range
    // so we return a number
    throw new Error(
      `Colour selection is not in expected range of choices.\n Selected color: ${color}`
    );
  }
}
