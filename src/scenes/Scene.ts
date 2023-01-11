import { Component } from "../components/Component";

export abstract class Scene extends Component {
  abstract start(): void;
}
