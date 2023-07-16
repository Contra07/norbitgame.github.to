import { render, resourses } from "../../engine.js";
import { Actor } from "../core/actor.js";
import { Sprite } from "../core/sprite.js";

export class Floor extends Actor{

    constructor(h: number, color: string){
        super(0,0,h,render.VIRTUAL_WIDTH, color )
        this._sprite = resourses.getSprite("road")
    }

    public draw(): void {
        //this.drawHitbox();
        //this.drawDebug();
        //render.drawPlayerSprite(this._sprite, this.x, this.y, this.hitboxWidht, this.hitboxHeight)
        //render.drawSprite(this._sprite, this.x, this.y)
    }
}