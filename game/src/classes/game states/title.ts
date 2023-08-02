import { StateMachine } from "../state machine/game machine.js";
import { GameState } from "../state machine/game state.js";
import { keys, render, resourses } from "../../engine.js";
import { DOManager } from "../managers/dom.js";

export class TitleState extends GameState{
    private menu: HTMLElement
    private welcome: string = "Добро пожаловать в игру! Нажмите Enter"

    constructor(states: StateMachine){
        super(states)
        this.menu = <HTMLElement>document.getElementById('menu')
    }

    public enter(params: any): void {
        (<HTMLElement>(<HTMLElement>(<HTMLElement>this.menu.children.namedItem("buttonlist")).children[0]).children.namedItem("button start")).addEventListener('click', this.startGame);
        (<HTMLElement>(<HTMLElement>(<HTMLElement>this.menu.children.namedItem("buttonlist")).children[1]).children.namedItem("button exit")).addEventListener('click', this.exitGame)
        document.getElementsByTagName('body')[0].className = 'menubody'
        DOManager.show(this.menu);
    }

    public exit(): void {
        DOManager.hide(this.menu)
    }

    update(dt: number): void {
        if(DOManager.isStartButton){
            DOManager.isStartButton = false
            this._states.change("play")
        }
        if(DOManager.isExitButton){
            DOManager.isExitButton = false
            window.location.href = '../'
        }
    }

    draw(): void {
    }

    private startGame(): void{
        DOManager.isStartButton = true
        
    }

    private exitGame():void{
        DOManager.isExitButton = true
    }
}