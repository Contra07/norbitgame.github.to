import { KeyManager } from "./keys.js";
import { RenderManager } from "./render.js";
import { StateMachine } from "./state machine.js";
import { PlayState } from "../states/play.js";
import { TitleState } from "../states/title.js";
import { State } from "../states/state.js";
import { LoseState } from "../states/lose.js";

export class GameManager{
    private _states: StateMachine
    private _keys: KeyManager
    private _render: RenderManager

    constructor(render: RenderManager, keys: KeyManager){
        this._render = render
        this._keys = keys

        let states: State[] = [
            new PlayState("play", this._render, this._keys),
            new TitleState("title", this._render, this._keys),
            new LoseState("lose", this._render, this._keys)
        ]

        this._states = new StateMachine(states)

        for (let state of states){
            state.init(this._states)
        }
    }

    public init(){
        this._states.change("title")
    }

    public update(dt: number){
        this._states.update(dt)
    }

    public draw(){
        this._states.draw()
    }
}