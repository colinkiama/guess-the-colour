import { Application, FederatedPointerEvent, Graphics } from "pixi.js";

import { COLOR_CHOICES } from "../consts/Colors";
import { ColorSelectedCallbackFunction } from "../types";
import { Component } from "./Component";

const COLOR_BUTTON_RADIUS = 25;
const COLOR_BUTTON_SPACING = 10;

export default class ColorButtonStack extends Component {
  colorSelectedCallback: ColorSelectedCallbackFunction;

  constructor(
    app: Application,
    colorSelectedCallback: ColorSelectedCallbackFunction
  ) {
    super(app);
    this.colorSelectedCallback = colorSelectedCallback;
    this.addColorButtons();
  }

  addColorButtons() {
    for (let i = 0; i < 5; i++) {
      const colorButtonGraphics = new Graphics();

      const circleGeometry = {
        x:
          (i % 5) * (COLOR_BUTTON_RADIUS * 2 + COLOR_BUTTON_SPACING) +
          COLOR_BUTTON_RADIUS,
        y: 0,
        radius: COLOR_BUTTON_RADIUS,
      };

      const buttonColor = COLOR_CHOICES[i];

      colorButtonGraphics
        .beginFill(buttonColor)
        .drawCircle(circleGeometry.x, circleGeometry.y, circleGeometry.radius)
        .endFill();

      colorButtonGraphics.interactive = true;
      colorButtonGraphics.on("pointerdown", (evnt) =>
        this.handleColorSelection(evnt, buttonColor)
      );

      this.addChild(colorButtonGraphics);

      this.x = this.app.screen.width / 2;
      this.y = this.app.screen.height - 80;
      this.pivot.x = this.width / 2;
    }
  }

  handleColorSelection(_: FederatedPointerEvent, selectedColor: number) {
    this.colorSelectedCallback(selectedColor);
    this.dimColorButtons();
  }

  dimColorButtons() {
    const colorButtonsLength = this.children.length;
    for (let i = 0; i < colorButtonsLength; i++) {
      this.children[i].alpha = 0.5;
    }
  }

  brightenColorButtons() {
    const colorButtonsLength = this.children.length;
    for (let i = 0; i < colorButtonsLength; i++) {
      this.children[i].alpha = 1.0;
    }
  }
}
