import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class BackgroundScrollingLayer extends Actor {
    _source;
    _now;
    _next;
    constructor(source, x, y, speed) {
        super(x, y, 0, 0, "");
        this.dx = speed;
        this._source = source;
        this._now = this._source;
        this._next = this._source;
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
            this._next = this._source;
        }
    }
    draw() {
        render.drawSprite(this._now, this.x, this.y);
        render.drawSprite(this._next, this.x + this._now.width, this.y);
    }
}
