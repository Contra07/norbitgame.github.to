import { StateMachine } from "../state machine/game machine.js";
import { GameState } from "../state machine/game state.js";
import { keys, render } from "../../engine.js";
import { DOManager } from "../managers/dom.js";

export class TitleState extends GameState{
    private menu: HTMLElement
    private welcome: string = "Добро пожаловать в игру! Нажмите Enter"

    constructor(states: StateMachine){
        super(states)
        this.menu = <HTMLElement>document.getElementById('menu')
    }

    public enter(params: any): void {
        DOManager.show(this.menu);
        (<HTMLElement>this.menu.children.namedItem("button start")).addEventListener('click', this.startGame)
    }

    public exit(): void {
        DOManager.hide(this.menu)
    }

    update(dt: number): void {
        if(DOManager.isStartButton){
            DOManager.isStartButton = false
            this._states.change("play")
        }
    }

    draw(): void {
        //render.drawMiddleText(this.welcome, render.WINDOW_WIDTH/2-250, render.WINDOW_HEIGHT/2)
    }

    private startGame(): void{
        DOManager.isStartButton = true
        
    }
}