import { FlyingObject } from "./flying object.js";
export class Banana extends FlyingObject {
    constructor(y, w, h, dx, color, sprite, animation) {
        super(y, w, h, color, sprite, animation);
        this.dx = dx;
    }
    clone() {
        return new Banana(this.y, this.hitboxWidht, this.hitboxHeight, this.dx, this.hitboxColor, this.sprite, this.animation);
    }
}
