import { keys, render } from "../../engine.js";
import { State } from "../state machine/state.js";
import { StateMachine } from "../state machine/machine.js";

export class EndState extends State{
    private win: string = "Вы выйграли! Нажмите Enter"
    private lose: string = "Вы проиграли! Нажмите Enter"
    private collected: string = "Очки: "
    private points: string = ""
    private messenge: string = ""

    constructor(states: StateMachine){
        super(states)
    }

    enter(params: any): void {
        if(params){
            this.points = this.collected + (params.coins*100)
            if(!params.win){
                this.messenge = this.win
            }
            else{
                this.messenge = this.lose
            }
        }
    }

    update(dt: number): void {
        if(keys.wasPressed("Enter")){
            this._states.change("play")
        }
    }

    draw(): void {
        render.drawMiddleText(this.messenge, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
        render.drawMiddleText(this.points, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2-50)
    }
}