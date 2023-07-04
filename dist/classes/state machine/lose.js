import { keys, render } from "../../engine.js";
import { BaseState } from "./base.js";
import { StateName } from "./names.js";
export class LoseState extends BaseState {
    welcome = "Вы проиграли! Нажмите Enter";
    constructor(states) {
        super(states);
    }
    update(dt) {
        if (keys.wasPressed("Enter")) {
            this._states.change(StateName.play);
        }
    }
    draw() {
        render.drawMiddleText(this.welcome, render.WINDOW_WIDTH / 2 - 100, render.WINDOW_HEIGHT / 2);
    }
}
