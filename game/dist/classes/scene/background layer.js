import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class BackgroundLayer extends Actor {
    _now;
    _next;
    _rndSprites;
    _rndSpriteTimer;
    _rndSpriteMax;
    _rndSpriteIndex;
    constructor(sprite, x, y, speed, lvlTime, rndSprites) {
        super(x, y, sprite.height, sprite.width, undefined, sprite);
        this.dx = speed;
        this._now = sprite;
        this._next = sprite;
        if (rndSprites && lvlTime) {
            this._rndSprites = rndSprites;
            this._rndSpriteMax = lvlTime / this._rndSprites.length;
            this._rndSpriteTimer = this._rndSpriteMax;
            this._rndSpriteIndex = 0;
        }
        else {
            this._rndSpriteTimer = 0;
            this._rndSpriteMax = 0;
            this._rndSpriteIndex = 0;
        }
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
            if (this.sprite) {
                this._next = this.sprite;
            }
            if (this._rndSprites) {
                if (this._rndSpriteTimer > this._rndSpriteMax) {
                    this.next = this._rndSprites[this._rndSpriteIndex];
                    this._rndSpriteTimer = 0;
                    if (this._rndSpriteIndex < this._rndSprites.length) {
                        this._rndSpriteIndex++;
                    }
                }
            }
        }
        if (this._rndSprites) {
            this._rndSpriteTimer += dt;
        }
    }
    draw() {
        render.drawSprite(this._now, this.x, this.y, this.now.width, this._now.height);
        render.drawSprite(this._next, this.x + this._now.width - 1, this.y, this.next.width, this._next.height);
    }
}
