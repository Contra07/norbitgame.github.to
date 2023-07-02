import { BaseState } from "../states/base.js";
export class StateMachine {
    _states;
    _current;
    constructor(states) {
        this._states = new Map();
        for (let state of states) {
            this._states.set(state.name, state);
        }
        this._current = new BaseState("base");
    }
    change(name) {
        this._current.exit();
        if (this._states.has(name)) {
            this._current = this._states.get(name);
        }
        this._current.enter();
    }
    update(dt) {
        this._current.update(dt);
    }
    draw() {
        this._current.draw();
    }
}
