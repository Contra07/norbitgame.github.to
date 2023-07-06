import { render } from "../../engine.js";
import { Actor } from "./actor.js";
import { Sprite } from "./sprite.js";
export class BackgroundSprite extends Actor {
    _actual_width;
    _actual_height;
    constructor(source, y, speed) {
        super(0, y, 0, 0, "white");
        this._sprite = new Sprite(source);
        this.dx = speed;
        this._actual_width = this._sprite.width / 2;
        this._actual_height = this._sprite.height;
    }
    update(dt) {
        this.move(dt);
        this.x = this.x % this._actual_width;
    }
    draw() {
        render.drawSprite(this._sprite, this.x, this.y);
    }
}
