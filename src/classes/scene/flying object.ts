import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
import { Sprite } from "../core/sprite.js";

export class FlyingObject extends Actor{
    
    private _isDestroy: boolean

    constructor(y: number, h: number, w: number, color: string, sprite?: Sprite) {
        super(render.VIRTUAL_WIDTH,y,h,w,color);
        if(sprite){
            this._sprite = sprite
        }
        this._isDestroy = false
    }

    public get isDestroy(): boolean{
        return this._isDestroy
    }

    public destroy(){
        this._isDestroy = true
    }

    public update(dt: number): void {
        this.move(dt)
        if(this.x + this.hitboxWidht < 0){
            this.destroy()
        }
    }

    public draw(): void {
        if(!this._isDestroy){
            this.drawActor(true)
        }
    }

    public copy(): FlyingObject{
        return new FlyingObject(
            this.y,
            this.hitboxHeight,
            this.hitboxWidht,
            this.hitboxColor,
            this._sprite
        )
    }
    
}