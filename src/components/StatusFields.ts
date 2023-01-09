import { Application, Container, Text, TextStyle } from "pixi.js";
import { Component } from "./Component";

const STATUS_FIELD_MARGIN = 20;

export default class StatusFields extends Component {
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

    let timeRemainingTextField = new Text("0", statusFieldsTextStyle);

    let scoreTextField = new Text("1", statusFieldsTextStyle);

    const statusFields: Text[] = [timeRemainingTextField, scoreTextField];

    for (let i = 0; i < 2; i++) {
      let statusField = statusFields[i];
      statusField.y = (i % 2) * (statusField.height + STATUS_FIELD_MARGIN);
    }

    textFieldContainer.addChild(timeRemainingTextField, scoreTextField);
    textFieldContainer.x = this.app.screen.width / 2;
    textFieldContainer.y = 40;
    textFieldContainer.pivot.x = textFieldContainer.width / 2;
    this.app.stage.addChild(textFieldContainer);
  }

  destroy(): void {
    throw new Error("Method not implemented.");
  }
}
