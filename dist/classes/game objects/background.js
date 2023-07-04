import { Actor } from "./actor.js";
export class Background extends Actor {
    _images;
    constructor(images, speed) {
        super(0, 0, 0, 0, "white");
        this._images = images;
    }
    draw() {
    }
}
