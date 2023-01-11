import { Application, Container, Text, TextStyle } from "pixi.js";
import { Component } from "./Component";

const STATUS_FIELD_MARGIN = 20;

export default class StatusFields extends Component {
  timeRemainingTextField!: Text;
  scoreTextField!: Text;
  textFieldContainer = new Container<Text>();

  constructor(app: Application) {
    super(app);
  }

  render() {
    let textFieldContainer = new Container<Text>();

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

    for (let i = 0; i < 2; i++) {
      let statusField = statusFields[i];
      statusField.x = this.app.screen.width / 2;
      statusField.y = (i % 2) * (statusField.height + STATUS_FIELD_MARGIN);
      statusField.anchor.x = 0.5;
    }

    textFieldContainer.addChild(
      this.timeRemainingTextField,
      this.scoreTextField
    );

    textFieldContainer.y = 40;
    this.app.stage.addChild(textFieldContainer);
  }

  destroy(): void {
    throw new Error("Method not implemented.");
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
