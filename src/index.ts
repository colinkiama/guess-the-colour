import "./style.css";
import { Application } from "pixi.js";
import MainGame from "./scenes/MainGame";

let app = new Application({ width: 360, height: 640 });
document.body.appendChild(app.view as HTMLCanvasElement);

let mainGame = new MainGame(app);
mainGame.start();
