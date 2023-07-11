import { State } from "../state machine/game state.js";
import { DOManager } from "../managers/dom.js";
export class EndState extends State {
    end;
    win = "Вы выйграли!";
    lose = "Вы проиграли!";
    collected = "Очки: ";
    points = "";
    messenge = "";
    constructor(states) {
        super(states);
        this.end = document.getElementById('end');
    }
    exit() {
        DOManager.hide(this.end);
    }
    enter(params) {
        DOManager.show(this.end);
        this.end.children.namedItem("button replay").addEventListener('click', this.restartGame);
        if (params) {
            this.points = this.collected + (params.coins * 100);
            if (!params.win) {
                this.messenge = this.win;
            }
            else {
                this.messenge = this.lose;
            }
        }
        this.end.children.namedItem("end message").innerText = this.messenge + "\n" + this.points;
    }
    update(dt) {
        if (DOManager.isEndButton) {
            this._states.change("play");
            DOManager.isEndButton = false;
        }
    }
    draw() {
        //render.drawMiddleText(this.messenge, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
        //render.drawMiddleText(this.points, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2-50)
    }
    restartGame() {
        DOManager.isEndButton = true;
    }
}
