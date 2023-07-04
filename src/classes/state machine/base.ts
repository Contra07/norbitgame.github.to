import { State } from "./state.js"
import { StateMachine } from "./states.js"

export class BaseState implements State{

    protected _states: StateMachine

    constructor(states: StateMachine){
        this._states = states
    }

    enter(): void { }

    exit(): void { }

    init(): void { }

    update(dt: number): void { }

    draw(): void { }

}