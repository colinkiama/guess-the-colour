import { Application, Graphics } from "pixi.js";
import { Colors, COLOR_CHOICES } from "../consts/Colors";
import { Component } from "./Component";

const RESULT_CIRCLE_RADIUS = 80;
const CYCLE_TIMEOUT = 2000; // In miliseconds;
// Around frequency of 3 flashes per second. See WCAG Success criteria 2.3.1: Three Flashes or Below Threshold (Level A)
const COLOR_UPDATE_INTERVAL = 333; // In milliseconds

export default class ColorResultCircle extends Component {
  graphics!: Graphics;
  cycleUpdateTimerId!: number;
  cycleCompletionTimerId!: number;
  completedCycleCallback: () => void;

  private cycleIndex: number;

  constructor(app: Application, completedCycleCallback: () => void) {
    super(app);
    this.completedCycleCallback = completedCycleCallback;
    this.cycleIndex = 0;
    this.graphics = new Graphics();

    // Timer creation methods return non-zero values
    this.cycleUpdateTimerId = 0;
    this.cycleCompletionTimerId = 0;
  }

  render(): void {
    this.draw();
    this.graphics.x = this.app.screen.width / 2;
    this.graphics.pivot.x = this.graphics.width / 2 - RESULT_CIRCLE_RADIUS;
    this.app.stage.addChild(this.graphics);
  }

  draw(): void {
    this.graphics
      .clear()
      .beginFill(COLOR_CHOICES[this.cycleIndex])
      .drawCircle(0, 300, RESULT_CIRCLE_RADIUS)
      .endFill();
  }

  cycleColorsToResult(color: number) {
    this.cycleCompletionTimerId = setTimeout(() => {
      clearInterval(this.cycleUpdateTimerId);
      clearTimeout(this.cycleCompletionTimerId);
      this.cycleUpdateTimerId = 0;
      this.cycleCompletionTimerId = 0;

      this.cycleIndex = COLOR_CHOICES.indexOf(color);
      this.draw();
      this.completedCycleCallback();
    }, CYCLE_TIMEOUT);

    this.cycleUpdateTimerId = setInterval(() => {
      this.cycleIndex = incrementCycleIndex(this.cycleIndex);
      this.draw();
    }, COLOR_UPDATE_INTERVAL);
  }

  destroy(): void {
    this.graphics.destroy();
    if (this.cycleUpdateTimerId !== 0) {
      clearInterval(this.cycleUpdateTimerId);
      this.cycleUpdateTimerId = 0;
    }

    if (this.cycleCompletionTimerId !== 0) {
      clearInterval(this.cycleCompletionTimerId);
      this.cycleCompletionTimerId = 0;
    }
  }
}

function incrementCycleIndex(currentIndex: number): number {
  let nextIndex = currentIndex + 1;
  if (nextIndex === COLOR_CHOICES.length) {
    nextIndex = 0;
  }

  return nextIndex;
}
