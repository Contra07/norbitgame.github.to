import { render } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class FlyingObject extends Actor {
    _isDestroy;
    constructor(y, h, w, color, sprite, animation) {
        super(render.VIRTUAL_WIDTH, y, h, w, color, sprite, animation);
        this._isDestroy = false;
    }
    get isDestroy() {
        return this._isDestroy;
    }
    spawn() {
        return this.clone();
    }
    destroy() {
        this._isDestroy = true;
    }
    update(dt) {
        super.update(dt);
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
    clone() {
        let object = new FlyingObject(this.y, this.hitboxHeight, this.hitboxWidht, this.hitboxColor, this.sprite, this.animation);
        object.x = this.x;
        object.y = this.y;
        object.dx = this.dx;
        if (this.sprite) {
            object.sprite = this.sprite;
        }
        if (this.animation) {
            object.animation = this.animation;
        }
        if (this.hitboxColor) {
            object.hitboxColor = this.hitboxColor;
        }
        return object;
    }
}
