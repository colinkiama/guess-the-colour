import { Application, Graphics } from "pixi.js";
import { Colors } from "../consts/Colors";

const COLOR_BUTTON_RADIUS = 25;
const COLOR_BUTTON_SPACING = 10;

const COLOR_BUTTON_COLORS: number[] = [
  Colors.RED,
  Colors.BLUE,
  Colors.GREEN,
  Colors.YELLOW,
  Colors.ORANGE,
];

export default class ColorButtonStack {
  #app: Application;
  graphics!: Graphics;

  constructor(app: Application) {
    this.#app = app;
  }

  render() {
    const colorButtonGraphics = new Graphics();

    for (let i = 0; i < 5; i++) {
      const circleGeometry = {
        x: (i % 5) * (COLOR_BUTTON_RADIUS * 2 + COLOR_BUTTON_SPACING),
        y: 0,
        radius: COLOR_BUTTON_RADIUS,
      };

      colorButtonGraphics
        .beginFill(COLOR_BUTTON_COLORS[i])
        .drawCircle(circleGeometry.x, circleGeometry.y, circleGeometry.radius)
        .endFill();
    }

    colorButtonGraphics.x = this.#app.screen.width / 2;
    colorButtonGraphics.y = this.#app.screen.height - 80;
    colorButtonGraphics.pivot.x =
      colorButtonGraphics.width / 2 - COLOR_BUTTON_RADIUS;

    this.#app.stage.addChild(colorButtonGraphics);
  }
}
