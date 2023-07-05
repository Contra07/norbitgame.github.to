import { render } from "../../engine.js"
import { Actor } from "./actor.js"
import { Sprite } from "./sprite.js"

export class BackgroundSprite extends Actor{
    private _actual_width: number
    private _actual_height: number

    constructor(source: string, y: number, speed:number) {
        super(0,y,0,0,"white")
        this._sprite = new Sprite(source)
        this.dx = speed
        this._actual_width = this._sprite.width /2
        this._actual_height = this._sprite.height
    }

    public update(dt: number): void {
        this.move(dt)
        this.x = this.x % this._actual_width
    }

    public draw(): void {
        render.drawSprite(this._sprite,this.x, this.y)
    }

}