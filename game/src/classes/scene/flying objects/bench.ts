import { Actor } from "../../core/actor.js";
import { CycleSprite } from "../../core/cycle sprite.js";
import { Sprite } from "../../core/sprite.js";
import { FlyingObject } from "./flying object.js";

export class Bench extends FlyingObject{
    private _canRun = false

    constructor(y: number, w: number, h: number,  dx: number,color?: string, sprite?: Sprite, animation?: CycleSprite) {
        super(y,w,h,color,sprite,animation);
        this.dx = dx
    }
    public get canRun(): boolean{
        return this._canRun
    }

    public canRunOnTop(actor: Actor): void{
        this._canRun = actor.y > this.y + this.hitboxHeight && actor.x+actor.hitboxHeight > this.x && actor.x < this.x + this.hitboxHeight
    }

    protected clone(): Bench{
        let object = new Bench(
            this.y,
            this.hitboxHeight,
            this.hitboxWidht,
            this.dx,
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