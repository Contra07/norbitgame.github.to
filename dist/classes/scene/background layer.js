import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class BackgroundLayer extends Actor {
    _now;
    _next;
    constructor(sprite, x, y, speed) {
        super(x, y, sprite.height, sprite.width, "", sprite);
        this.dx = speed;
        this._sprite = sprite;
        this._now = this._sprite;
        this._next = this._sprite;
    }
    get now() {
        return this._now;
    }
    set now(sprite) {
        this._now = sprite;
    }
    get next() {
        return this._next;
    }
    set next(sprite) {
        this._next = sprite;
    }
    transition(layer) {
        this.x = layer.x;
        this._now = layer._now;
        this._next = layer._next;
    }
    update(dt) {
        this.move(dt);
        if (this.x + this._now.width < 0) {
            this.x += this._now.width;
            this._now = this._next;
            if (this._sprite) {
                this._next = this._sprite;
            }
        }
    }
    draw() {
        render.drawSprite(this._now, this.x, this.y, this.hitboxWidht, this._now.height);
        render.drawSprite(this._next, this.x + this._now.width, this.y, this.hitboxWidht, this._next.height);
        //render.drawSpriteOld(this._now, this.x, this.y)
        //render.drawSpriteOld(this._next, this.x+this._now.width, this.y)
    }
}
