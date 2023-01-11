import "./style.css";
import { Application } from "pixi.js";
import MainGame from "./scenes/MainGame";
import { GuessData } from "./types";
import GameOver from "./scenes/GameOver";
import { Scene } from "./scenes/Scene";

let app = new Application({ width: 360, height: 640 });
document.body.appendChild(app.view as HTMLCanvasElement);

loadScene(createNewGame());

function gameOverCallback(results: GuessData) {
  loadScene(new GameOver(app, results, () => playAgainCallback()));
}

function playAgainCallback() {
  loadScene(createNewGame());
}

function createNewGame(): MainGame {
  return new MainGame(app, (results) => gameOverCallback(results));
}

function loadScene(scene: Scene) {
  if (app.stage.children.length > 0) {
    app.stage.children[0].destroy();
  }

  app.stage.addChild(scene);
  scene.start();
}
