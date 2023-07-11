import { StateMachine } from "./game machine.js"

export class State{

    protected _states: StateMachine

    constructor(states: StateMachine){
        this._states = states
    }

    public enter(params: any): void { }

    public exit(): void { }

    public init(): void { }

    public update(dt: number): void { }

    public draw(): void { }
}