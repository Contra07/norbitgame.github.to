import { GameState } from "../state machine/game state.js";
import { DOManager } from "../managers/dom.js";
export class EndState extends GameState {
    win;
    lose;
    mwin = "Победа!!";
    mlose = "Поражение.";
    collected = "Очки: ";
    points = "";
    messenge = "";
    constructor(states) {
        super(states);
        this.win = document.getElementById('win');
        this.lose = document.getElementById('lose');
    }
    exit() {
        DOManager.hide(this.win);
        DOManager.hide(this.lose);
    }
    enter(params) {
        if (params) {
            this.points = this.collected + (params.coins * 100);
            if (!params.win) {
                this.messenge = this.mwin;
                this.win.children.namedItem("buttonwinlist").children[0].children.namedItem("button replay").addEventListener('click', this.restartGame);
                this.win.children.namedItem("buttonwinlist").children[1].children.namedItem("button form").addEventListener('click', this.form);
                this.win.children.namedItem("end top box").children.namedItem("end message").innerText = this.messenge + " " + this.points;
                DOManager.show(this.win);
            }
            else {
                this.messenge = this.mlose;
                this.lose.children.namedItem("buttonloselist").children[0].children.namedItem("button replay").addEventListener('click', this.restartGame);
                this.lose.children.namedItem("buttonloselist").children[1].children.namedItem("button exit").addEventListener('click', this.exitGame);
                this.lose.children.namedItem("end top box").children.namedItem("end message").innerText = this.messenge + " " + this.points;
                DOManager.show(this.lose);
            }
        }
    }
    update(dt) {
        if (DOManager.isEndButton) {
            this._states.change("play");
            DOManager.isEndButton = false;
        }
        if (DOManager.isExitButton) {
            DOManager.isExitButton = false;
            window.location.href = '../site/main.html';
        }
        if (DOManager.isForm) {
            DOManager.isForm = false;
            window.location.href = '../site/form.html';
        }
    }
    draw() {
        //render.drawMiddleText(this.messenge, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
        //render.drawMiddleText(this.points, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2-50)
    }
    restartGame() {
        DOManager.isEndButton = true;
    }
    exitGame() {
        DOManager.isExitButton = true;
    }
    form() {
        DOManager.isForm = true;
    }
}
