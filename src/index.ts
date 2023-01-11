import "./style.css";
import { Application } from "pixi.js";
import MainGame from "./scenes/MainGame";
import { GuessData } from "./types";
import GameOver from "./scenes/GameOver";

let app = new Application({ width: 360, height: 640 });
document.body.appendChild(app.view as HTMLCanvasElement);

let mainGame = new MainGame(app, (results: GuessData) =>
  gameOverCallback(results)
);

mainGame.start();

function gameOverCallback(results: GuessData) {
  mainGame.destroy();
  let gameOverScene = new GameOver(app, results, () => playAgainCallback());
  gameOverScene.start();
}

function playAgainCallback() {
  mainGame.start();
}
