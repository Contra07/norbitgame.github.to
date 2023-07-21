import { render } from "../../../engine.js";
import { Actor } from "../../core/actor.js";
import { Sprite } from "../../core/sprite.js";
import { CycleSprite } from "../../core/cycle sprite.js";

export class FlyingObject extends Actor{
    private _isDestroy: boolean

    constructor(y: number,  h: number,  w: number,color?: string, sprite?: Sprite, animation?: CycleSprite) {
        super(render.VIRTUAL_WIDTH,y,h,w,color, sprite, animation);
        this._isDestroy = false
    }

    public get isDestroy(): boolean{
        return this._isDestroy
    }

    public spawn():FlyingObject{
        return this.clone()
    }

    public destroy(){
        this._isDestroy = true
    }

    public update(dt: number): void {
        super.update(dt)
        this.move(dt)
        if(this.x + this.hitboxWidht < 0){
            this.destroy()
        }
    }

    public draw(): void {
        if(!this._isDestroy){
            this.drawActor()
        }
    }

    public clone(): FlyingObject{
        let object = new FlyingObject(
            this.y,
            this.hitboxWidht,
            this.hitboxHeight,
            this.hitboxColor,
            this.sprite,
            this.animation
        )
        object.x = this.x
        object.y = this.y
        object.dx = this.dx
        if(this.sprite){
            object.sprite = this.sprite
        }
        if(this.animation){
            object.animation = this.animation
        }
        if(this.hitboxColor){
            object.hitboxColor = this.hitboxColor
        }
        return object
    }
    
}