import { render } from "../../engine.js";
import { Actor } from "./actor.js";
import { Sprite } from "./sprite.js";
export class BackgroundSprite extends Actor {
    constructor(source, x, y, speed) {
        super(x, y, 0, 0, "white");
        this._sprite = new Sprite(source);
        this.dx = speed;
    }
    update(dt) {
        this.move(dt);
    }
    draw() {
        render.drawSprite(this._sprite, this.x, this.y);
    }
}
