import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class BackgroundLayer extends Actor {
    _now;
    _next;
    _enter;
    _isEnter;
    constructor(sprite, enter, x, y, speed) {
        super(x, y, sprite.height, sprite.width, undefined, sprite);
        this.dx = speed;
        this._enter = enter;
        this._now = sprite;
        this._next = sprite;
        this._isEnter = true;
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
        super.update(dt);
        this.move(dt);
        if (this.x + this._now.width <= 0) {
            this.x += this._now.width;
            this._now = this._next;
            if (this._isEnter) {
                this._isEnter = false;
                this._next = this._enter;
            }
            else if (this.sprite) {
                this._next = this.sprite;
            }
        }
    }
    draw() {
        render.drawSprite(this._now, this.x, this.y, this.now.width, this._now.height);
        render.drawSprite(this._next, this.x + this._now.width - 1, this.y, this.next.width, this._next.height);
    }
}
