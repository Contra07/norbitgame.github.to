import { keys, render, resourses } from "../../engine.js";
import { GameState } from "../state machine/game state.js";
import { StateMachine } from "../state machine/game machine.js";
import { DOManager } from "../managers/dom.js";

export class EndState extends GameState{
    private win: HTMLElement
    private lose: HTMLElement
    private mwin: string = "Победа!"
    private mlose: string = "Игра окончена."
    private collected: string = "Очки: "
    private points: string = ""
    private messenge: string = ""

    constructor(states: StateMachine){
        super(states)
        this.win = <HTMLElement>document.getElementById('win')
        this.lose = <HTMLElement>document.getElementById('lose')
    }
    
    public exit(): void {
        DOManager.hide(this.win)
        DOManager.hide(this.lose)
    }

    enter(params: any): void {
        if(params){
            this.points = this.collected + (params.coins*100)
            if(!params.win){
                this.messenge = this.mwin;
                (<HTMLElement>(<HTMLElement>(<HTMLElement>this.win.children.namedItem("buttonwinlist")).children[0]).children.namedItem("button replay")).addEventListener('click', this.restartGame);
                (<HTMLElement>(<HTMLElement>(<HTMLElement>this.win.children.namedItem("buttonwinlist")).children[1]).children.namedItem("button form")).addEventListener('click', this.form);
                (<HTMLElement>(<HTMLElement>this.win.children.namedItem("end top box")).children.namedItem("end message")).innerText = this.messenge + " " + this.points;
                document.getElementsByTagName('body')[0].className = 'winbody'
                DOManager.show(this.win);
            }
            else{
                this.messenge = this.mlose;
                (<HTMLElement>(<HTMLElement>(<HTMLElement>this.lose.children.namedItem("buttonloselist")).children[0]).children.namedItem("button replay")).addEventListener('click', this.restartGame);
                (<HTMLElement>(<HTMLElement>(<HTMLElement>this.lose.children.namedItem("buttonloselist")).children[1]).children.namedItem("button exit")).addEventListener('click', this.exitGame);
                (<HTMLElement>(<HTMLElement>this.lose.children.namedItem("end top box")).children.namedItem("end message")).innerText = this.messenge + " " + this.points
                document.getElementsByTagName('body')[0].className = 'losebody'
                DOManager.show(this.lose);
            }
        }
    }

    update(dt: number): void {
        if(DOManager.isEndButton){
            this._states.change("play")
            DOManager.isEndButton = false
        }
        if(DOManager.isExitButton){
            DOManager.isExitButton = false
            window.location.href = '../'
        }
        if(DOManager.isForm){
            DOManager.isForm = false
            window.location.href = '../form'
        }
    }

    draw(): void {
        //render.drawMiddleText(this.messenge, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
        //render.drawMiddleText(this.points, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2-50)
    }

    private restartGame(): void{
        DOManager.isEndButton = true
    }

    private exitGame():void{
        DOManager.isExitButton = true
    }

    private form():void{
        DOManager.isForm = true
    }
}