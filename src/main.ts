import "./style.css";
import { Application } from "pixi.js";
import ColorButtonStack from "./components/ColorButtonStack";
import StatusFields from "./components/StatusFields";
import ColorResultIndicator from "./components/ColorResultIndicator";

let app = new Application({ width: 360, height: 640 });
document.body.appendChild(app.view as HTMLCanvasElement);

let colorButtonStack = new ColorButtonStack(app);
colorButtonStack.render();

let colorResultIndicator = new ColorResultIndicator(app);
colorResultIndicator.render();

let statusFields = new StatusFields(app);
statusFields.render();
