import { State } from "./state.js";

export class StateMachine{
    private _states: Map<string, State>
    private _current: State

    constructor() {
        this._states = new Map()
        this._current = new State(this)
    }

    public get current(): State{
        return this._current
    }

    public add(name: string, state: State):boolean{
        if(this._states.has(name)){
            return false
        }
        else {
            this._states.set(name, state)
            return true
        }
    }

    public change(name: string, params?: any): void {
        if(this._states.has(name)){
            this._current.exit()
            this._current = <State>this._states.get(name)
            this._current.enter(params)
        }
    }

    public update(dt: number){
        this._current.update(dt)
    }

    public draw(){
        this._current.draw()
    }
}