import { State } from "../../interfaces/state.js";
import { BaseState } from "../states/base.js";

export class StateMachine{
    private _states: Map<string, State>
    private _current: State

    constructor(states: State[]) {
        this._states = new Map()
        for (let state of states){
            this._states.set(state.name , state)
        }
        this._current = new BaseState("base");
    }

    public change(name: string): void {
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