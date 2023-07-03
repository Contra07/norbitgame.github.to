import { StateMachine } from "./state machine.js";
import { PlayState } from "../states/play.js";
import { TitleState } from "../states/title.js";
import { LoseState } from "../states/lose.js";
export class GameManager {
    _states;
    _keys;
    _render;
    constructor(render, keys) {
        this._render = render;
        this._keys = keys;
        let states = [
            new PlayState("play", this._render, this._keys),
            new TitleState("title", this._render, this._keys),
            new LoseState("lose", this._render, this._keys)
        ];
        this._states = new StateMachine(states);
        for (let state of states) {
            state.init(this._states);
        }
    }
    init() {
        this._states.change("title");
    }
    update(dt) {
        this._states.update(dt);
    }
    draw() {
        this._states.draw();
    }
}
