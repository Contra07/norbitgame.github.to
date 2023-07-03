import { BaseState } from "./base.js";
export class LoseState extends BaseState {
    _render;
    _keys;
    welcome = "Вы проиграли! Нажмите Enter";
    constructor(name, render, keys) {
        super(name);
        this._render = render;
        this._keys = keys;
    }
    enter() {
    }
    exit() {
    }
    update(dt) {
        if (this._keys.wasPressed("Enter")) {
            this._states.change("play");
        }
    }
    draw() {
        this._render.drawMiddleText(this.welcome, this._render.WINDOW_WIDTH / 2 - 100, this._render.WINDOW_HEIGHT / 2);
    }
}
