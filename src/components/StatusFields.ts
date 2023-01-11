import { Application, Text, TextStyle } from "pixi.js";
import { Component } from "./Component";

const STATUS_FIELD_MARGIN = 20;
export default class StatusFields extends Component {
  timeRemainingTextField!: Text;
  scoreTextField!: Text;

  constructor(app: Application) {
    super(app);
    this.addTextFields();
  }

  addTextFields() {
    const statusFieldsTextStyle = new TextStyle({
      fill: "#ffffff",
      fontSize: 24,
      align: "center",
    });

    this.timeRemainingTextField = new Text("0", statusFieldsTextStyle);
    this.scoreTextField = new Text("0", statusFieldsTextStyle);

    const statusFields: Text[] = [
      this.timeRemainingTextField,
      this.scoreTextField,
    ];

    const statusFieldsLength = statusFields.length;

    for (let i = 0; i < statusFieldsLength; i++) {
      let statusField = statusFields[i];
      statusField.x = this.app.screen.width / 2;
      statusField.y =
        (i % statusFieldsLength) * (statusField.height + STATUS_FIELD_MARGIN);
      statusField.anchor.x = 0.5;
    }

    this.addChild(this.timeRemainingTextField, this.scoreTextField);

    this.y = 40;
  }

  updateTime(timeLeft: number) {
    this.timeRemainingTextField.text = `${Math.floor(
      millisecondsToSeconds(timeLeft)
    )}`;
  }

  updateScore(correctGuesses: number) {
    this.scoreTextField.text = correctGuesses.toString(10);
  }
}

const millisecondsToSeconds = (num: number) => num / 1000;
