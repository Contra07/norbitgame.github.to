import { CycleSprite } from "../../core/cycle sprite.js";
import { Sprite } from "../../core/sprite.js";
import { FlyingObject } from "./flying object.js";

export class Garbage extends FlyingObject{
    constructor(y: number, w: number, h: number, dx: number,color?: string, sprite?: Sprite, animation?: CycleSprite) {
        super(y,w,h,color,sprite,animation);
        this.dx = dx
    }
}