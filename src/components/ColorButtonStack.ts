import {
  Application,
  Container,
  FederatedPointerEvent,
  Graphics,
} from "pixi.js";
import { Colors } from "../consts/Colors";
import { Component } from "./Component";

const COLOR_BUTTON_RADIUS = 25;
const COLOR_BUTTON_SPACING = 10;

const COLOR_BUTTON_COLORS: number[] = [
  Colors.RED,
  Colors.BLUE,
  Colors.GREEN,
  Colors.YELLOW,
  Colors.ORANGE,
];

export default class ColorButtonStack extends Component {
  graphics!: Graphics;

  constructor(app: Application) {
    super(app);
  }

  render() {
    const colorButtonContainer = new Container<Graphics>();

    for (let i = 0; i < 5; i++) {
      let colorButtonGraphics = new Graphics();

      const circleGeometry = {
        x: (i % 5) * (COLOR_BUTTON_RADIUS * 2 + COLOR_BUTTON_SPACING),
        y: 0,
        radius: COLOR_BUTTON_RADIUS,
      };

      const buttonColor = COLOR_BUTTON_COLORS[i];

      colorButtonGraphics
        .beginFill(buttonColor)
        .drawCircle(circleGeometry.x, circleGeometry.y, circleGeometry.radius)
        .endFill();

      colorButtonGraphics.interactive = true;
      colorButtonGraphics.on("pointerdown", (evnt) =>
        this.handleColorSelection(evnt, buttonColor)
      );

      colorButtonContainer.addChild(colorButtonGraphics);
    }

    colorButtonContainer.x = this.app.screen.width / 2;
    colorButtonContainer.y = this.app.screen.height - 80;
    colorButtonContainer.pivot.x =
      colorButtonContainer.width / 2 - COLOR_BUTTON_RADIUS;

    this.app.stage.addChild(colorButtonContainer);
  }

  handleColorSelection(
    evnt: FederatedPointerEvent,
    selectedColor: number
  ): void {
    // console.log(target.geometry.colors);

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
        console.log("");
        break;
    }
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}
