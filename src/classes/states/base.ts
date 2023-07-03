import { State } from "./state.js"
import { RenderManager } from "../managers/render.js"
import { StateMachine } from "../managers/state machine.js"
export class BaseState implements State{

    protected _name: string
    protected _states!: StateMachine

    public get name(): string{
        return this._name
    }

    constructor(name: string){
        this._name = name
    }

    enter(): void {
        
    }

    exit(): void {

    }

    init(states: StateMachine): void {
        this._states = states
    }

    update(dt: number): void {

    }

    draw(): void {

    }

}