import { GameState } from "../state machine/game state.js";
import { DOManager } from "../managers/dom.js";
export class TitleState extends GameState {
    menu;
    welcome = "Добро пожаловать в игру! Нажмите Enter";
    constructor(states) {
        super(states);
        this.menu = document.getElementById('menu');
    }
    enter(params) {
        this.menu.children.namedItem("buttonlist").children[0].children.namedItem("button start").addEventListener('click', this.startGame);
        this.menu.children.namedItem("buttonlist").children[1].children.namedItem("button exit").addEventListener('click', this.exitGame);
        document.getElementsByTagName('body')[0].className = 'menubody';
        DOManager.show(this.menu);
    }
    exit() {
        DOManager.hide(this.menu);
    }
    update(dt) {
        if (DOManager.isStartButton) {
            DOManager.isStartButton = false;
            this._states.change("play");
        }
        if (DOManager.isExitButton) {
            DOManager.isExitButton = false;
            window.location.href = '../site/main.html';
        }
    }
    draw() {
    }
    startGame() {
        DOManager.isStartButton = true;
    }
    exitGame() {
        DOManager.isExitButton = true;
    }
}
