import { FlyingObject } from "./flying object.js";
export class Bench extends FlyingObject {
    _canRun = false;
    constructor(y, w, h, dx, color, sprite, animation) {
        super(y, w, h, color, sprite, animation);
        this.dx = dx;
    }
    get canRun() {
        return this._canRun;
    }
    canRunOnTop(actor) {
        this._canRun = actor.y > this.y + this.hitboxHeight && actor.x + actor.hitboxHeight > this.x && actor.x < this.x + this.hitboxHeight;
    }
    clone() {
        let object = new Bench(this.y, this.hitboxHeight, this.hitboxWidht, this.dx, this.hitboxColor, this.sprite, this.animation);
        object.x = this.x;
        object.y = this.y;
        object.dx = this.dx;
        if (this.sprite) {
            object.sprite = this.sprite;
        }
        if (this.animation) {
            object.animation = this.animation;
        }
        if (this.hitboxColor) {
            object.hitboxColor = this.hitboxColor;
        }
        return object;
    }
}
