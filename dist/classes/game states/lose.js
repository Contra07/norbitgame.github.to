import { keys, render } from "../../engine.js";
import { State } from "../state machine/state.js";
export class LoseState extends State {
    lose = "Вы проиграли! Нажмите Enter";
    collected = "Очки: ";
    message = "";
    constructor(states) {
        super(states);
    }
    enter(params) {
        if (params) {
            this.message = this.collected + (params * 100);
        }
    }
    update(dt) {
        if (keys.wasPressed("Enter")) {
            this._states.change("play");
        }
    }
    draw() {
        render.drawMiddleText(this.lose, render.WINDOW_WIDTH / 2 - 250, render.WINDOW_HEIGHT / 2);
        render.drawMiddleText(this.message, render.WINDOW_WIDTH / 2 - 250, render.WINDOW_HEIGHT / 2 - 50);
    }
}
