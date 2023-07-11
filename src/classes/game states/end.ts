import { keys, render } from "../../engine.js";
import { State } from "../state machine/game state.js";
import { StateMachine } from "../state machine/game machine.js";
import { DOManager } from "../managers/dom.js";

export class EndState extends State{
    private end: HTMLElement
    private win: string = "Вы выйграли!"
    private lose: string = "Вы проиграли!"
    private collected: string = "Очки: "
    private points: string = ""
    private messenge: string = ""

    constructor(states: StateMachine){
        super(states)
        this.end = <HTMLElement>document.getElementById('end')
    }
    
    public exit(): void {
        DOManager.hide(this.end)
    }

    enter(params: any): void {
        DOManager.show(this.end);
        (<HTMLElement>this.end.children.namedItem("button replay")).addEventListener('click', this.restartGame)
        if(params){
            this.points = this.collected + (params.coins*100)
            if(!params.win){
                this.messenge = this.win
            }
            else{
                this.messenge = this.lose
            }
        }
        (<HTMLElement>this.end.children.namedItem("end message")).innerText = this.messenge + "\n" + this.points

    }

    update(dt: number): void {
        if(DOManager.isEndButton){
            this._states.change("play")
            DOManager.isEndButton = false
        }
    }

    draw(): void {
        //render.drawMiddleText(this.messenge, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
        //render.drawMiddleText(this.points, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2-50)
    }

    private restartGame(): void{
        DOManager.isEndButton = true
    }
}