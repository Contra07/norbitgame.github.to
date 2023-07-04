import { StateMachine } from "../state machine/states.js";
import { StateName } from "../state machine/names.js";

export class GameManager{
    private _states: StateMachine

    constructor(){
        this._states = new StateMachine(StateName.title)
    }

    public init(){ }

    public update(dt: number){
        this._states.update(dt)
    }

    public draw(){
        this._states.draw()
    }
}