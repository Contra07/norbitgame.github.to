import { FlyingObject } from "./flying object.js";
export class Coin extends FlyingObject {
    _minHeight;
    _maxHeight;
    constructor(w, h, dx, minHeight, maxHeight, color, sprite, animation) {
        super(0, w, h, color, sprite, animation);
        this._minHeight = minHeight;
        this._maxHeight = maxHeight;
        this.dx = dx;
    }
    spawn() {
        let coin = this.clone();
        coin.y = Coin.randomNumber(this._minHeight, this._maxHeight);
        return coin;
    }
    //Случайное число
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
}
