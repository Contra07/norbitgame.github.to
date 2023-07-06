import { State } from "../state machine/state.js";
import { keys, render } from "../../engine.js";
export class TitleState extends State {
    welcome = "Добро пожаловать в игру! Нажмите Enter";
    constructor(states) {
        super(states);
    }
    update(dt) {
        if (keys.wasPressed("Enter")) {
            this._states.change("play");
        }
    }
    draw() {
        render.drawMiddleText(this.welcome, render.WINDOW_WIDTH / 2 - 250, render.WINDOW_HEIGHT / 2);
    }
}
