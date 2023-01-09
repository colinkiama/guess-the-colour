import { Application } from "pixi.js";

export abstract class Component {
  protected app: Application;

  constructor(app: Application) {
    this.app = app;
  }

  abstract render(): void;

  abstract destroy(): void;
}
