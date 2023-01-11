import "./style.css";
import { Application } from "pixi.js";
import MainGame from "./scenes/MainGame";
import { GuessData } from "./types";
import GameOver from "./scenes/GameOver";

let app = new Application({ width: 360, height: 640 });
document.body.appendChild(app.view as HTMLCanvasElement);

let gameOverScene: GameOver;
let mainGameScene = new MainGame(app, (results: GuessData) =>
  gameOverCallback(results)
);

mainGameScene.start();

function gameOverCallback(results: GuessData) {
  mainGameScene.destroy();
  gameOverScene = new GameOver(app, results, () => playAgainCallback());
  gameOverScene.start();
}

function playAgainCallback() {
  gameOverScene.destroy();
  mainGameScene.start();
}
