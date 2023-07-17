import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class FlyingObject extends Actor {
    _isDestroy;
    constructor(y, h, w, color, sprite) {
        super(render.VIRTUAL_WIDTH, y, h, w, color);
        if (sprite) {
            this._sprite = sprite;
        }
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
            this.drawActor();
        }
    }
    copy() {
        return new FlyingObject(this.y, this.hitboxHeight, this.hitboxWidht, this.hitboxColor, this._sprite);
    }
}
