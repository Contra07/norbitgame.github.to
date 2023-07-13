import { GameObject } from "../core/game object.js";
import { GameState } from "./game state.js";

export class StateMachine extends GameObject{
    private _states: Map<string, GameState>
    private _current: GameState

    constructor() {
        super()
        this._states = new Map()
        this._current = new GameState(this)
    }

    public get current(): GameState{
        return this._current
    }

    public add(name: string, state: GameState):boolean{
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
            this._current = <GameState>this._states.get(name)
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