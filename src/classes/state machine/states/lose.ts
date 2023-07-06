import { keys, render } from "../../../engine.js";
import { BaseState } from "./base.js";
import { StateName } from "../names.js";
import { StateMachine } from "../statem.js";

export class LoseState extends BaseState{
    private lose: string = "Вы проиграли! Нажмите Enter"
    private collected: string = "Собрано монет: "
    private message: string = ""

    constructor(states: StateMachine){
        super(states)
    }

    enter(params: any): void {
        if(params){
            this.message = this.collected + <number>params
        }
    }

    update(dt: number): void {
        if(keys.wasPressed("Enter")){
            this._states.change(StateName.play)
        }
    }

    draw(): void {
        render.drawMiddleText(this.lose, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
        render.drawMiddleText(this.message, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2-50)
    }
}