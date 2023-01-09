import { Application, Graphics } from "pixi.js";
import { Colors } from "../consts/Colors";
import { Component } from "./Component";

const RESULT_CIRCLE_RADIUS = 80;

export default class ColorResultCircle extends Component {
  graphics!: Graphics;

  constructor(app: Application) {
    super(app);
  }

  render(): void {
    let resultColorGraphics = new Graphics();

    resultColorGraphics
      .beginFill(Colors.RED)
      .drawCircle(0, 300, RESULT_CIRCLE_RADIUS)
      .endFill();

    resultColorGraphics.x = this.app.screen.width / 2;
    resultColorGraphics.pivot.x =
      resultColorGraphics.width / 2 - RESULT_CIRCLE_RADIUS;

    this.app.stage.addChild(resultColorGraphics);
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}
