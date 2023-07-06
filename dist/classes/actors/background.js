import { GameObject } from "../core/game object.js";
export class Background extends GameObject {
    _images;
    constructor(images, speed) {
        super();
        this._images = images;
    }
    draw() {
    }
}
