import { KeyManager } from "../managers/keys.js";
import { RenderManager } from "../managers/render.js";
import { BaseState } from "./base.js";

export class LoseState extends BaseState{
    private _render: RenderManager
    private _keys: KeyManager
    private welcome: string = "Вы проиграли! Нажмите Enter"

    constructor(name: string, render: RenderManager, keys: KeyManager){
        super(name)
        this._render = render
        this._keys = keys
    }

    enter(): void {
        
    }

    exit(): void {

    }

    update(dt: number): void {
        if(this._keys.wasPressed("Enter")){
            this._states.change("play")
        }
    }

    draw(): void {
        this._render.drawMiddleText(this.welcome, this._render.WINDOW_WIDTH/2-100, this._render.WINDOW_HEIGHT/2)
    }
}