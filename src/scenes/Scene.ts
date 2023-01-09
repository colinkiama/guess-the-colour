import { Application } from "pixi.js";

export default abstract class Scene {
  protected app: Application;

  constructor(app: Application) {
    this.app = app;
  }
}
