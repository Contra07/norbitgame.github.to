import { BaseState } from "./base.js";
export class TitleState extends BaseState {
    _render;
    welcome = "Добро пожаловать в игру! <br/> Нажмите Enter";
    constructor(states, name, render) {
        super(states, name);
        this._render = render;
    }
    enter() {
    }
    exit() {
    }
    init() {
    }
    update(dt) {
    }
    draw() {
        this._render.drawMiddleText(this.welcome, this._render.WINDOW_WIDTH / 2, this._render.WINDOW_HEIGHT / 2);
    }
}
