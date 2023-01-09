import ColorButtonStack from "../components/ColorButtonStack";
import StatusFields from "../components/StatusFields";
import ColorResultIndicator from "../components/ColorResultIndicator";
import Scene from "./Scene";
import { Application } from "pixi.js";

export default class MainGame extends Scene {
  private colorButtonStack!: ColorButtonStack;
  private colorResultIndicator!: ColorResultIndicator;
  private statusFields!: StatusFields;

  constructor(app: Application) {
    super(app);
  }

  start() {
    this.colorButtonStack = new ColorButtonStack(this.app);
    this.colorButtonStack.render();

    this.colorResultIndicator = new ColorResultIndicator(this.app);
    this.colorResultIndicator.render();

    this.statusFields = new StatusFields(this.app);
    this.statusFields.render();
  }

  destroy() {}

  reset() {
    this.destroy();
    this.start();
  }
}
