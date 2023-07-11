import { State } from "../state machine/game state.js";
import { DOManager } from "../managers/dom.js";
export class TitleState extends State {
    menu;
    welcome = "Добро пожаловать в игру! Нажмите Enter";
    constructor(states) {
        super(states);
        this.menu = document.getElementById('menu');
    }
    enter(params) {
        DOManager.show(this.menu);
        this.menu.children.namedItem("button start").addEventListener('click', this.startGame);
    }
    exit() {
        DOManager.hide(this.menu);
    }
    update(dt) {
        if (DOManager.isStartButton) {
            DOManager.isStartButton = false;
            this._states.change("play");
        }
    }
    draw() {
        //render.drawMiddleText(this.welcome, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
    }
    startGame() {
        DOManager.isStartButton = true;
    }
}
