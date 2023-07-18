import { FlyingObject } from "./flying objects/flying object.js";
export class Banana extends FlyingObject {
    constructor(y, h, w, dx, color, sprite, animation) {
        super(y, h, w, color, sprite, animation);
        this.dx = dx;
    }
}
