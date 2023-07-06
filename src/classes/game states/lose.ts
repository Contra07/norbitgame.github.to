import { keys, render } from "../../engine.js";
import { State } from "../state machine/state.js";
import { StateMachine } from "../state machine/machine.js";

export class LoseState extends State{
    private lose: string = "Вы проиграли! Нажмите Enter"
    private collected: string = "Очки: "
    private message: string = ""

    constructor(states: StateMachine){
        super(states)
    }

    enter(params: any): void {
        if(params){
            this.message = this.collected + (<number>params*100)
        }
    }

    update(dt: number): void {
        if(keys.wasPressed("Enter")){
            this._states.change("play")
        }
    }

    draw(): void {
        render.drawMiddleText(this.lose, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
        render.drawMiddleText(this.message, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2-50)
    }
}