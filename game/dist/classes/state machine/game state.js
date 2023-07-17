import { GameObject } from "../core/game object.js";
export class GameState extends GameObject {
    _states;
    constructor(states) {
        super();
        this._states = states;
    }
    enter(params) { }
    exit() { }
    init() { }
    update(dt) { }
    draw() { }
}
