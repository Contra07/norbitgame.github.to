import { StateMachine } from "../state machine/machine.js";
import { State } from "../state machine/state.js";
import { keys, render } from "../../engine.js";

export class TitleState extends State{

    private welcome: string = "Добро пожаловать в игру! Нажмите Enter"

    constructor(states: StateMachine){
        super(states)
    }

    update(dt: number): void {
        if(keys.wasPressed("Enter")){
            this._states.change("play")
        }
    }

    draw(): void {
        render.drawMiddleText(this.welcome, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
    }
}