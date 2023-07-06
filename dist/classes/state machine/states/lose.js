import { keys, render } from "../../../engine.js";
import { BaseState } from "./base.js";
import { StateName } from "../names.js";
export class LoseState extends BaseState {
    lose = "Вы проиграли! Нажмите Enter";
    collected = "Собрано монет: ";
    message = "";
    constructor(states) {
        super(states);
    }
    enter(params) {
        if (params) {
            this.message = this.collected + params;
        }
    }
    update(dt) {
        if (keys.wasPressed("Enter")) {
            this._states.change(StateName.play);
        }
    }
    draw() {
        render.drawMiddleText(this.lose, render.WINDOW_WIDTH / 2 - 250, render.WINDOW_HEIGHT / 2);
        render.drawMiddleText(this.message, render.WINDOW_WIDTH / 2 - 250, render.WINDOW_HEIGHT / 2 - 50);
    }
}
