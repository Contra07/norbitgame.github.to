import { BaseState } from "./base.js";
import { LoseState } from "./lose.js";
import { StateName } from "./names.js";
import { PlayState } from "./play.js";
import { TitleState } from "./title.js";
export class StateMachine {
    _states;
    _current;
    constructor(startState) {
        this._states = new Map();
        this._states.set(StateName.play, new PlayState(this));
        this._states.set(StateName.lose, new LoseState(this));
        this._states.set(StateName.title, new TitleState(this));
        this._current = new BaseState(this);
        this.change(startState);
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
