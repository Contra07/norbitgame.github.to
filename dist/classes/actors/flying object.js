import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class FlyingObject extends Actor {
    _isDestroy;
    constructor(y, h, w, color) {
        super(render.VIRTUAL_WIDTH, y, h, w, color);
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
