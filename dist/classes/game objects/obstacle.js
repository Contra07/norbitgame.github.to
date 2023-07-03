import { Actor } from "./actor.js";
export class Obstacle extends Actor {
    _isDestroy;
    constructor(render, y, h, w, color) {
        super(render, render.VIRTUAL_WIDTH, y, h, w, color);
        this._isDestroy = false;
    }
    get isDestroy() {
        return this._isDestroy;
    }
    destroy() {
        this._isDestroy = true;
    }
    update(dt) {
        this.move(dt);
        if (this.x + this.hitboxWidht < 0) {
            this.destroy();
        }
    }
    draw() {
        if (!this._isDestroy) {
            this.drawHitbox();
        }
    }
}
