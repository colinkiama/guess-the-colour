import ColorButtonStack from "../components/ColorButtonStack";
import StatusFields from "../components/StatusFields";
import ColorResultIndicator from "../components/ColorResultIndicator";
import Scene from "./Scene";
import { Application } from "pixi.js";
import { fetchRandomNumbers } from "../api/RandomNumber";
import { GuessData, SelectedColorCallbackFunction } from "../types";
import { Colors } from "../consts/Colors";
import GuessService from "../services/guessService";
import { StatusUpdateType } from "../consts/StatusUpdateType";

const colorChoiceArray = [
  Colors.RED,
  Colors.BLUE,
  Colors.GREEN,
  Colors.YELLOW,
  Colors.ORANGE,
];

const GAME_TIME = 120000; // In milliseconds

export default class MainGame extends Scene {
  private colorButtonStack!: ColorButtonStack;
  private colorResultIndicator!: ColorResultIndicator;
  private statusFields!: StatusFields;
  private generatedColorChoices!: number[];
  private guessService!: GuessService;
  private timeLeft!: number;

  constructor(app: Application) {
    super(app);
  }

  async start() {
    this.colorButtonStack = new ColorButtonStack(this.app, (color) =>
      this.handleColorSelection(color)
    );
    this.colorButtonStack.render();

    this.colorResultIndicator = new ColorResultIndicator(this.app, () =>
      this.handleCompletedResultIndicatorCycle()
    );
    this.colorResultIndicator.render();

    this.statusFields = new StatusFields(this.app);
    this.statusFields.render();

    // TODO: Handle potential errors (it makes a network request)
    // this.generatedColorChoices = await fetchRandomNumbers();

    this.guessService = new GuessService();
    this.guessService.setAnswer(
      this.generatedColorChoices[this.guessService.data.totalGuesses]
    );

    console.log(
      "Color Choices for this game session:",
      this.generatedColorChoices
    );

    this.timeLeft = GAME_TIME;
  }

  handleCompletedResultIndicatorCycle() {
    this.updateStatus("score");
  }

  updateStatus(updateType: string) {
    switch (updateType) {
      case StatusUpdateType.score:
        this.statusFields.updateScore(this.guessService.data.correctGuesses);
        break;
      case StatusUpdateType.time:
        this.statusFields.updateTime(this.timeLeft);
        break;
    }
  }

  handleColorSelection(color: Number) {
    let playerGuess = this.determineColorSelection(color);
    this.colorResultIndicator.cycleColorsToResult(color);
    this.guessService.guess(playerGuess);
    this.guessService.setAnswer(
      this.generatedColorChoices[this.guessService.data.totalGuesses]
    );
  }

  determineColorSelection(color: Number): number {
    for (let i = 0; i < colorChoiceArray.length; i++) {
      const choiceValue = colorChoiceArray[i];
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

  destroy() {}

  reset() {
    this.destroy();
    this.start();
  }
}
