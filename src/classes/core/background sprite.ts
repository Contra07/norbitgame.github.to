import { render } from "../../engine.js"
import { Actor } from "./actor.js"
import { Sprite } from "./sprite.js"

export class BackgroundSprite extends Actor{
    constructor(source: string, x: number, y: number, speed:number) {
        super(x,y,0,0,"white")
        this._sprite = new Sprite(source)
        this.dx = speed
    }

    public update(dt: number): void {
        this.move(dt)
    }

    public draw(): void {
        render.drawSprite(this._sprite,this.x, this.y)
    }
}
