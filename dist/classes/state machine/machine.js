import { State } from "./state.js";
export class StateMachine {
    _states;
    _current;
    constructor() {
        this._states = new Map();
        this._current = new State(this);
    }
    get current() {
        return this._current;
    }
    add(name, state) {
        if (this._states.has(name)) {
            return false;
        }
        else {
            this._states.set(name, state);
            return true;
        }
    }
    change(name, params) {
        if (this._states.has(name)) {
            this._current.exit();
            this._current = this._states.get(name);
            this._current.enter(params);
        }
    }
    update(dt) {
        this._current.update(dt);
    }
    draw() {
        this._current.draw();
    }
}