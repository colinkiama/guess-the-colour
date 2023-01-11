import ColorButtonStack from "../components/ColorButtonStack";
import StatusFields from "../components/StatusFields";
import ColorAnswerIndicator from "../components/ColorAnswerIndicator";
import { Application, Text } from "pixi.js";
import { fetchRandomNumbers } from "../api/RandomNumber";
import { COLOR_CHOICES, ColorStrings } from "../consts/Colors";
import GuessService from "../services/guessService";
import { StatusUpdateType } from "../consts/StatusUpdateType";
import GameTimerService from "../services/GameTimerService";
import { GuessData, StatusUpdate } from "../types";
import { Scene } from "./Scene";

const GAME_TIME = 120000; // In milliseconds
const GAME_TIME_UPDATE_INTERVAL = 500; // In milliseconds

export default class MainGame extends Scene {
  private colorAnswerIndicator!: ColorAnswerIndicator;
  private statusFields!: StatusFields;
  private generatedColorChoices!: number[];
  private guessService!: GuessService;
  private gameTimerService!: GameTimerService;
  private gameOverCallback: (results: GuessData) => void;
  private revealingAnswer: boolean = false;
  private colorButtonStack!: ColorButtonStack;

  constructor(
    app: Application,
    gameOverCallback: (results: GuessData) => void
  ) {
    super(app);
    this.gameOverCallback = gameOverCallback;
  }

  async start() {
    this.revealingAnswer = false;
    this.generatedColorChoices = await this.generateAnswers();

    if (this.generatedColorChoices.length < 1) {
      // Do not continue the game. Error message is already shown on screen
      return;
    }

    this.colorButtonStack = this.addColorButtonStack();
    this.colorAnswerIndicator = this.addColorAnswerIndicator();
    this.statusFields = this.addStatusFields();
    this.guessService = this.setUpGuessService();

    this.gameTimerService = this.setUpGameTimerService();
    this.updateStatus(StatusUpdateType.TIME, { timeLeft: GAME_TIME });
    this.gameTimerService.start();

    console.log(
      "Color Choices for this game session:",
      this.generatedColorChoices
    );
  }

  setUpGameTimerService(): GameTimerService {
    let gameTimerService = new GameTimerService({
      sessionLength: GAME_TIME,
      tickInterval: GAME_TIME_UPDATE_INTERVAL,
      tickCallback: (timeLeft: number) =>
        this.updateStatus(StatusUpdateType.TIME, { timeLeft: timeLeft }),
      timerCompletedCallback: () => {
        this.updateStatus(StatusUpdateType.TIME, { timeLeft: 0 });
        this.gameOverCallback(this.guessService.data);
      },
    });

    return gameTimerService;
  }

  setUpGuessService(): GuessService {
    let guessService = new GuessService();
    guessService.setAnswer(
      this.generatedColorChoices[guessService.data.totalGuesses]
    );

    return guessService;
  }

  addStatusFields(): StatusFields {
    let statusFields = new StatusFields(this.app);
    this.addChild(statusFields);
    return statusFields;
  }

  addColorAnswerIndicator(): ColorAnswerIndicator {
    let colorAnswerIndicator = new ColorAnswerIndicator(this.app, () =>
      this.handleCompletedResultIndicatorCycle()
    );

    this.addChild(colorAnswerIndicator);

    return colorAnswerIndicator;
  }

  async generateAnswers(): Promise<number[]> {
    let generatedAnswers: number[] = [];
    let loadingText = this.addLoadingText();

    try {
      generatedAnswers = await fetchRandomNumbers();
      loadingText.destroy();
    } catch (error) {
      console.error(error);
      loadingText.text =
        "Loading Failed!\nPlease restart game or try again later.";
    }

    return generatedAnswers;
  }

  addLoadingText(): Text {
    let loadingText = new Text("Loading...", {
      fontFamily: "Arial",
      fontSize: 20,
      align: "center",
      fill: ColorStrings.WHITE,
    });

    loadingText.anchor.set(0.5);
    loadingText.x = this.app.screen.width / 2;
    loadingText.y = this.app.screen.height / 2;

    this.addChild(loadingText);

    return loadingText;
  }

  addColorButtonStack(): ColorButtonStack {
    let colorButtonStack = new ColorButtonStack(this.app, (color) =>
      this.handleColorSelection(color)
    );

    this.addChild(colorButtonStack);

    return colorButtonStack;
  }

  handleCompletedResultIndicatorCycle() {
    this.revealingAnswer = false;
    this.colorButtonStack.appearActive();
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
