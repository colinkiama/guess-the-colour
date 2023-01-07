import "./style.css";
import { Application, Graphics } from "pixi.js";

let app = new Application({ width: 360, height: 640 });
document.body.appendChild(app.view as HTMLCanvasElement);

const colorButtonGraphics = new Graphics();

const COLOR_BUTTON_RADIUS = 25;
const COLOR_BUTTON_SPACING = 10;

for (let i = 0; i < 5; i++) {
  const circleGeometry = {
    x: (i % 5) * (COLOR_BUTTON_RADIUS * 2 + COLOR_BUTTON_SPACING),
    y: 0,
    radius: COLOR_BUTTON_RADIUS,
  };

  colorButtonGraphics
    .beginFill(0xff0000)
    .drawCircle(circleGeometry.x, circleGeometry.y, circleGeometry.radius)
    .endFill();
}

colorButtonGraphics.x = app.screen.width / 2;
colorButtonGraphics.y = app.screen.height - 80;
colorButtonGraphics.pivot.x =
  colorButtonGraphics.width / 2 - COLOR_BUTTON_RADIUS;

app.stage.addChild(colorButtonGraphics);
