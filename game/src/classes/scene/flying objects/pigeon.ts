import { CycleSprite } from "../../core/cycle sprite.js";
import { Sprite } from "../../core/sprite.js";
import { FlyingObject } from "./flying object.js";

export class Pigeon extends FlyingObject{
    private _minHeight: number
    private _maxHeight: number

    constructor(h: number, w: number, dx: number, minHeight: number, maxHeight: number,color?: string, sprite?: Sprite, animation?: CycleSprite) {
        super(0,w,h,color,sprite,animation);
        this._minHeight = minHeight
        this._maxHeight = maxHeight
        this.dx = dx
    }

    public spawn(): FlyingObject {
        let coin = this.clone()
        coin.y = Pigeon.randomNumber(this._minHeight, this._maxHeight)
        return coin
    }

    //Случайное число
    private static randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }
}