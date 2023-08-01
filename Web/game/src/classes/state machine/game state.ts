import { GameObject } from "../core/game object.js"
import { StateMachine as GameMachine } from "./game machine.js"

export class GameState extends GameObject{

    protected _states: GameMachine

    constructor(states: GameMachine){
        super()
        this._states = states
    }
  
    public enter(params: any): void { }

    public exit(): void { }

    public init(): void { }

    public update(dt: number): void { }

    public draw(): void { }
}