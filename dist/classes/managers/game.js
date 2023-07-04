import { StateMachine } from "../state machine/statem.js";
import { StateName } from "../state machine/names.js";
export class GameManager {
    _states;
    constructor() {
        this._states = new StateMachine(StateName.title);
    }
    init() { }
    update(dt) {
        this._states.update(dt);
    }
    draw() {
        this._states.draw();
    }
}
