import ColorButtonStack from "../components/ColorButtonStack";
import StatusFields from "../components/StatusFields";
import ColorResultIndicator from "../components/ColorResultIndicator";
import Scene from "./Scene";
import { Application } from "pixi.js";
import { fetchRandomNumbers } from "../api/randomNumber";

export default class MainGame extends Scene {
  private colorButtonStack!: ColorButtonStack;
  private colorResultIndicator!: ColorResultIndicator;
  private statusFields!: StatusFields;
  private generatedColorChoices!: Number[];

  constructor(app: Application) {
    super(app);
  }

  async start() {
    this.colorButtonStack = new ColorButtonStack(this.app);
    this.colorButtonStack.render();

    this.colorResultIndicator = new ColorResultIndicator(this.app);
    this.colorResultIndicator.render();

    this.statusFields = new StatusFields(this.app);
    this.statusFields.render();

    // TODO: Handle potential errors (it makes a network request)
    this.generatedColorChoices = await fetchRandomNumbers();
    console.log(
      "Color Choices for this game session:",
      this.generatedColorChoices
    );
  }

  destroy() {}

  reset() {
    this.destroy();
    this.start();
  }
}
