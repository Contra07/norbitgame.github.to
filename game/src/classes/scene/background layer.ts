import { render } from "../../engine.js"
import { Actor } from "../core/actor.js"
import { Sprite } from "../core/sprite.js"

export class BackgroundLayer extends Actor{
    private _now: Sprite
    private _next: Sprite
    private _rndSprites?: Sprite[]
    private _rndSpriteTimer: number
    private _rndSpriteMax: number
    private _rndSpriteIndex: number

    constructor(sprite: Sprite, x: number, y: number, speed:number, lvlTime?: number, rndSprites?: Sprite[]) {
        super(x,y,sprite.height,sprite.width, undefined, sprite)
        this.dx = speed
        this._now = sprite
        this._next = sprite
        if(rndSprites && lvlTime){
            this._rndSprites = rndSprites
            this._rndSpriteMax = lvlTime/this._rndSprites.length
            this._rndSpriteTimer = this._rndSpriteMax
            this._rndSpriteIndex = 0
        }
        else{
            this._rndSpriteTimer = 0
            this._rndSpriteMax = 0
            this._rndSpriteIndex = 0
        }
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
            if(this._rndSprites){
                if(this._rndSpriteTimer > this._rndSpriteMax){
                    this.next = this._rndSprites[this._rndSpriteIndex]
                    this._rndSpriteTimer = 0
                    if(this._rndSpriteIndex < this._rndSprites.length){
                        this._rndSpriteIndex++
                    }
                }
            }
        }
        if(this._rndSprites){
            this._rndSpriteTimer += dt
        }
    }
    

    public draw(): void {
        render.drawSprite(this._now, this.x, this.y, this.now.width, this._now.height)
        render.drawSprite(this._next, this.x+this._now.width-1, this.y, this.next.width, this._next.height)
    }
}