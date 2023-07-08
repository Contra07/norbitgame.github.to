import { StateMachine } from "./state machine/machine.js";
import { LoseState } from "./game states/lose.js";
import { PlayState } from "./game states/play.js";
import { TitleState } from "./game states/title.js";
//TODO: Singleton game
export class GameManager {
    _gameStates;
    constructor() {
        this._gameStates = new StateMachine();
    }
    init() {
        if (this._gameStates.add("play", new PlayState(this._gameStates))
            && this._gameStates.add("lose", new LoseState(this._gameStates))
            && this._gameStates.add("title", new TitleState(this._gameStates))) {
            this._gameStates.change("play");
        }
        else {
            console.log("Game states error");
        }
    }
    update(dt) {
        this._gameStates.update(dt);
    }
    draw() {
        this._gameStates.draw();
    }
}
