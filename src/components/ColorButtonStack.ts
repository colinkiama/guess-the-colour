import {
  Application,
  Container,
  FederatedPointerEvent,
  Graphics,
} from "pixi.js";

import { Colors, COLOR_CHOICES } from "../consts/Colors";
import { SelectedColorCallbackFunction } from "../types";
import { Component } from "./Component";

const COLOR_BUTTON_RADIUS = 25;
const COLOR_BUTTON_SPACING = 10;

type CirlceGeometry = {
  x: number;
  y: number;
  radius: number;
};
export default class ColorButtonStack extends Component {
  colorButtonContainer!: Container<Graphics>;
  selectedColorCallback: SelectedColorCallbackFunction;

  constructor(
    app: Application,
    selectedColorCallback: SelectedColorCallbackFunction
  ) {
    super(app);
    this.selectedColorCallback = selectedColorCallback;
  }

  render() {
    this.colorButtonContainer = new Container<Graphics>();

    for (let i = 0; i < 5; i++) {
      let colorButtonGraphics = new Graphics();

      const circleGeometry = {
        x: (i % 5) * (COLOR_BUTTON_RADIUS * 2 + COLOR_BUTTON_SPACING),
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

      this.colorButtonContainer.addChild(colorButtonGraphics);
    }

    this.colorButtonContainer.x = this.app.screen.width / 2;
    this.colorButtonContainer.y = this.app.screen.height - 80;
    this.colorButtonContainer.pivot.x =
      this.colorButtonContainer.width / 2 - COLOR_BUTTON_RADIUS;

    this.app.stage.addChild(this.colorButtonContainer);
  }

  handleColorSelection(evnt: FederatedPointerEvent, selectedColor: number) {
    switch (selectedColor) {
      case Colors.RED:
        console.log("Player clicked on Red Button");
        break;
      case Colors.BLUE:
        console.log("Player clicked on Blue Button");
        break;
      case Colors.GREEN:
        console.log("Player clicked on Green Button");
        break;
      case Colors.YELLOW:
        console.log("Player clicked on Yellow Button");
        break;
      case Colors.ORANGE:
        console.log("Player clicked on Orange Button");
        break;
      default:
        console.log("Couldn't handle color selection");
        break;
    }

    this.dimColorButtons();
    this.sendColorSelectionNotification(selectedColor);
  }

  dimColorButtons() {
    const colorButtonsLength = this.colorButtonContainer.children.length;
    for (let i = 0; i < colorButtonsLength; i++) {
      this.colorButtonContainer.children[i].alpha = 0.5;
    }
  }

  brightenColorButtons() {
    const colorButtonsLength = this.colorButtonContainer.children.length;
    for (let i = 0; i < colorButtonsLength; i++) {
      this.colorButtonContainer.children[i].alpha = 1.0;
    }
  }

  destroy(): void {
    this.colorButtonContainer.destroy();
  }

  sendColorSelectionNotification(selectedColor: number) {
    this.selectedColorCallback(selectedColor);
  }
}
