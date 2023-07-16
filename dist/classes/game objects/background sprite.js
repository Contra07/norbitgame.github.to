import { Actor } from "../core/actor.js";
import { Sprite } from "../core/sprite.js";
class BackgroundSprite extends Actor {
    constructor(source, x, y, speed) {
        super(x, y, 0, 0, "white", new Sprite(source));
        this.dx = speed;
    }
    update(dt) {
        this.move(dt);
    }
    draw() {
        //  render.drawSprite(this._sprite,this.x, this.y)
    }
}
