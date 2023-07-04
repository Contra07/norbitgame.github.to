import { keys, render } from "../../engine.js";
import { Actor } from "./actor.js";
export class Player extends Actor {
    _gravity;
    _isJump;
    _jumpHight;
    constructor(x, y, gravity, jumpHight, h, w, color) {
        super(x, y, h, w, color);
        this._gravity = gravity;
        this._isJump = false;
        this.d2y = this._gravity;
        this._jumpHight = jumpHight;
    }
    update(dt) {
        if (keys.wasPressed(" ")) {
            this.jump(this._jumpHight);
        }
        this.move(dt);
    }
    draw() {
        render.drawSquare(this.x, this.y, this.hitboxHeight, this.hitboxWidht, this.hitboxColor);
        //let posx = 10
        //let posy = 300
        //for (let key in this) {
        //    this.render.drawDebugText(key + ': ' + this[key], posx, posy+this.hitboxHeight)
        //    posy -= 10
        //}
    }
    onFloor(h) {
        this.y = h;
        this.dy = 0;
        this.d2y = 0;
        this._isJump = false;
    }
    jump(hight) {
        if (!this._isJump) {
            this.dy = hight;
            this.d2y = this._gravity;
            this._isJump = true;
        }
    }
}
