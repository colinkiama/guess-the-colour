import "./style.css";
import { Application } from "pixi.js";
import ColorButtonStack from "./components/ColorButtonStack";

let app = new Application({ width: 360, height: 640 });
document.body.appendChild(app.view as HTMLCanvasElement);

let colorButtonStack = new ColorButtonStack(app);
colorButtonStack.render();
