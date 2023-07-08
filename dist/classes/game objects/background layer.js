import { BackgroundSprite } from "../core/background sprite.js";
export class BackgroundScrollingLayer {
    _now;
    _next;
    _afterNext;
    _source;
    constructor(source, y, speed) {
        this._now = new BackgroundSprite(source, 0, y, speed);
        this._next = new BackgroundSprite(source, this._now.sprite.width, y, speed);
        this._afterNext = new BackgroundSprite(source, this._now.sprite.width * 2, y, speed);
        this._source = source;
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
        this._afterNext.x = this._next.x + this._next.sprite.width;
    }
    update(dt) {
        this._now.update(dt);
        this._next.update(dt);
        this._afterNext.update(dt);
        if (this._next.x < 0) {
            let tmp = this._now;
            this._now = this._next;
            this._next = this._afterNext;
            this._afterNext = new BackgroundSprite(this._source, this._now.x + this._afterNext.sprite.width * 2, this._now.y, this._now.dx);
        }
    }
    draw() {
        this._now.draw();
        this._next.draw();
        this._afterNext.draw();
    }
}
