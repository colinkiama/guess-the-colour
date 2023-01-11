import { Application, Graphics } from "pixi.js";
import { COLOR_CHOICES } from "../consts/Colors";
import { Component } from "./Component";

const RESULT_CIRCLE_RADIUS = 80;
const CYCLE_TIMEOUT = 2000; // In miliseconds;

// Around frequency of 3 flashes per second.
// See WCAG Success criteria 2.3.1: Three Flashes or Below Threshold (Level A)
// See: https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html
const COLOR_UPDATE_INTERVAL = 333; // In milliseconds

export default class ColorResultCircle extends Component {
  cycleUpdateTimerId!: number;
  cycleCompletionTimerId!: number;
  completedCycleCallback: () => void;

  private cycleIndex: number;

  constructor(app: Application, completedCycleCallback: () => void) {
    super(app);
    this.completedCycleCallback = completedCycleCallback;
    this.cycleIndex = 0;
    let indicatorCircle = new Graphics();

    // Timer creation methods return non-zero values
    this.cycleUpdateTimerId = 0;
    this.cycleCompletionTimerId = 0;

    indicatorCircle.x = this.app.screen.width / 2;
    indicatorCircle.pivot.x = indicatorCircle.width / 2;

    this.addChild(indicatorCircle);
    this.draw();
  }

  draw(): void {
    let indicatorcircle = this.getChildAt(0) as Graphics;

    indicatorcircle
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
    if (this.cycleUpdateTimerId !== 0) {
      clearInterval(this.cycleUpdateTimerId);
      this.cycleUpdateTimerId = 0;
    }

    if (this.cycleCompletionTimerId !== 0) {
      clearInterval(this.cycleCompletionTimerId);
      this.cycleCompletionTimerId = 0;
    }

    super.destroy();
  }
}

function incrementCycleIndex(currentIndex: number): number {
  let nextIndex = currentIndex + 1;
  if (nextIndex === COLOR_CHOICES.length) {
    nextIndex = 0;
  }

  return nextIndex;
}
