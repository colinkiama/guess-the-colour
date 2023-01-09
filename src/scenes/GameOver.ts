import { Application } from "pixi.js";
import { GameResults } from "../types";
import Scene from "./Scene";

export default class GameOver extends Scene {
  results: GameResults;

  constructor(app: Application, results: GameResults) {
    super(app);
    this.results = results;
  }
}
