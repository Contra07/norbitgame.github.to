import { render } from "../../engine.js";
import { Actor } from "./actor.js";
export class BackgroundImage extends Actor {
    _image;
    _source;
    _width;
    _height;
    _actual_width;
    _actual_height;
    constructor(source, y, speed, w, h) {
        super(0, y, 0, 0, "white");
        this._image = new Image();
        this._image.src = source;
        this._source = this._image.src;
        this._actual_width = this._image.width;
        this._actual_height = this._image.height;
        this.dx = speed;
        this._width = w;
        this._height = h;
    }
    update(dt) {
        this.move(dt);
        this.x = this.x % this._width;
    }
    draw() {
        render.drawImage(this._image, this.x, this.y);
    }
}
