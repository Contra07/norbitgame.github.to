import { BaseState } from "./states/base.js";
import { LoseState } from "./states/lose.js";
import { StateName } from "./names.js";
import { PlayState } from "./states/play.js";
import { State } from "./istate.js";
import { TitleState } from "./states/title.js";

export class StateMachine{
    private _states: Map<StateName, State>
    private _current: State

    constructor(startState: StateName) {
        this._states = new Map()
        this._states.set(StateName.play, new PlayState(this))
        this._states.set(StateName.lose, new LoseState(this))
        this._states.set(StateName.title, new TitleState(this))
        this._current = new BaseState(this)
        this.change(startState)
    }

    public change(name: StateName): void {
        this._current.exit()
        if(this._states.has(name)){
            this._current = <State>this._states.get(name)
        }
        this._current.enter()
    }

    public update(dt: number){
        this._current.update(dt)
    }

    public draw(){
        this._current.draw()
    }
}