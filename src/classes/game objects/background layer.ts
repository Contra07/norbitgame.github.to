import { render } from "../../engine.js"
import { Actor } from "../core/actor.js"
import { Sprite } from "../core/sprite.js"

export class BackgroundScrollingLayer extends Actor{
    private _source: Sprite
    private _now: Sprite
    private _next: Sprite

    constructor(source: Sprite, x:number, y: number, speed:number) {
        super(x,y,0,0,"")
        this.dx = speed
        this._source = source
        this._now = this._source
        this._next = this._source
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

    public transition(layer: BackgroundScrollingLayer){
        this.x = layer.x
        this._now = layer._now
        this._next = layer._next
    }

    public update(dt: number): void {
        this.move(dt)
        if(this.x+this._now.width < 0){
            this.x += this._now.width
            this._now = this._next
            this._next = this._source
        }
    }

    public draw(): void {
        render.drawSprite(this._now, this.x, this.y)
        render.drawSprite(this._next, this.x+this._now.width, this.y)
    }
}