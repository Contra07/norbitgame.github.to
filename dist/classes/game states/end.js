import { keys, render } from "../../engine.js";
import { State } from "../state machine/state.js";
export class EndState extends State {
    win = "Вы выйграли! Нажмите Enter";
    lose = "Вы проиграли! Нажмите Enter";
    collected = "Очки: ";
    points = "";
    messenge = "";
    constructor(states) {
        super(states);
    }
    enter(params) {
        if (params) {
            this.points = this.collected + (params.coins * 100);
            if (!params.win) {
                this.messenge = this.win;
            }
            else {
                this.messenge = this.lose;
            }
        }
    }
    update(dt) {
        if (keys.wasPressed("Enter")) {
            this._states.change("play");
        }
    }
    draw() {
        render.drawMiddleText(this.messenge, render.WINDOW_WIDTH / 2 - 250, render.WINDOW_HEIGHT / 2);
        render.drawMiddleText(this.points, render.WINDOW_WIDTH / 2 - 250, render.WINDOW_HEIGHT / 2 - 50);
    }
}
