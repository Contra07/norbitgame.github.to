import { BackgroundSprite } from "../core/background sprite.js"

export class BackgroundScrollingLayer{
    private _now: BackgroundSprite
    private _next: BackgroundSprite
    private _afterNext: BackgroundSprite
    private _source: string

    constructor(source: string, y: number, speed:number) {
        this._now = new BackgroundSprite(source,0,y,speed)
        this._next = new BackgroundSprite(source,this._now.sprite.width, y,speed)
        this._afterNext = new BackgroundSprite(source,this._now.sprite.width*2,y,speed)
        this._source = source
    }

    public get now(): BackgroundSprite{
        return this._now
    }
    public set now(sprite: BackgroundSprite){
        this._now = sprite
    }
    
    public get next(): BackgroundSprite{
        return this._next
    }
    
    public set next(sprite: BackgroundSprite){
        this._next = sprite
        this._afterNext.x = this._next.x + this._next.sprite.width
    }

    public update(dt: number): void {
        this._now.update(dt)
        this._next.update(dt)
        this._afterNext.update(dt)
        if(this._next.x < 0) {
            let tmp: BackgroundSprite = this._now
            this._now = this._next
            this._next = this._afterNext
            this._afterNext = new BackgroundSprite(this._source, this._now.x + this._afterNext.sprite.width*2,this._now.y,this._now.dx)
        }
    }

    public draw(): void {
        this._now.draw()
        this._next.draw()
        this._afterNext.draw()
    }

}