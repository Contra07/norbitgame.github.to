import { render } from "../../engine.js"
import { Actor } from "../core/actor.js"
import { Sprite } from "../core/sprite.js"

export class BackgroundLayer extends Actor{
    private _now: Sprite
    private _next: Sprite

    constructor(sprite: Sprite, y: number, speed:number) {
        super(0,y,sprite.height,sprite.width, undefined, sprite)
        this.dx = speed
        this._now = sprite
        this._next = sprite
    }

    public get now(): Sprite{
        return this._now
    }
    public set now(sprite: Sprite){
        this._now = sprite
    }
    
    public get next(): Sprite{
        return this._next
    }
    
    public set next(sprite: Sprite){
        this._next = sprite
    }

    public transition(layer: BackgroundLayer){
        this.x = layer.x
        this._now = layer._now  
        this._next = layer._next
    }

    public update(dt: number): void {
        super.update(dt)
        this.move(dt)
        if(this.x+this._now.width <= 0){
            this.x += this._now.width
            this._now = this._next
            if(this.sprite){
                this._next = this.sprite
            }
        }
    }

    public draw(): void {
        render.drawSprite(this._now, this.x, this.y, this.hitboxWidht, this._now.height)
        render.drawSprite(this._next, this.x+this._now.width-1, this.y, this.hitboxWidht, this._next.height)
        //render.drawSpriteOld(this._now, this.x, this.y)
        //render.drawSpriteOld(this._next, this.x+this._now.width, this.y)
    }
}