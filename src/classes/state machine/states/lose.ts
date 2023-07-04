import { keys, render } from "../../../engine.js";
import { BaseState } from "./base.js";
import { StateName } from "../names.js";
import { StateMachine } from "../statem.js";

export class LoseState extends BaseState{
    private welcome: string = "Вы проиграли! Нажмите Enter"

    constructor(states: StateMachine){
        super(states)
    }

    update(dt: number): void {
        if(keys.wasPressed("Enter")){
            this._states.change(StateName.play)
        }
    }

    draw(): void {
        render.drawMiddleText(this.welcome, render.WINDOW_WIDTH/2-100, render.WINDOW_HEIGHT/2)
    }
}