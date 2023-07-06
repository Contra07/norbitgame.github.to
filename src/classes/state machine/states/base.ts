import { State } from "../istate.js"
import { StateMachine } from "../statem.js"

export class BaseState implements State{

    protected _states: StateMachine

    constructor(states: StateMachine){
        this._states = states
    }

    enter(params: any): void { }

    exit(): void { }

    init(): void { }

    update(dt: number): void { }

    draw(): void { }

}