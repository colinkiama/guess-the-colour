import { Application, Container } from "pixi.js";

export abstract class Component extends Container {
  protected app: Application;

  constructor(app: Application) {
    super();
    this.app = app;
  }
}
