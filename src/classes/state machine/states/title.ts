import { StateMachine } from "../statem.js";
import { BaseState } from "./base.js";
import { keys, render } from "../../../engine.js";
import { StateName } from "../names.js";

export class TitleState extends BaseState{

    private welcome: string = "Добро пожаловать в игру! Нажмите Enter"

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