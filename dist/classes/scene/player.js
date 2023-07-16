import { keys } from "../../engine.js";
import { Actor } from "../core/actor.js";
import { CycleSprite } from "./cycle sprite.js";
export class Player extends Actor {
    //Атрибуты
    _gravity;
    _jumpSpeed;
    //
    _spritesRun;
    _jumpSprite;
    //Состояния
    _isDoubleJump;
    _isJump;
    _isInvincible;
    constructor(x, y, gravity, jumpHeight, h, w, color, jumpSprite, frametime, spritesRun) {
        super(x, y, h, w, color);
        this._gravity = gravity;
        this._isJump = false;
        this.d2y = this._gravity;
        this._jumpSpeed = Math.sqrt(2 * jumpHeight * gravity * (-1));
        this._isDoubleJump = false;
        this._isInvincible = false;
        this._jumpSprite = jumpSprite;
        this._spritesRun = new CycleSprite(spritesRun, frametime);
    }
    get isInvincible() {
        return this._isInvincible;
    }
    update(dt) {
        if (keys.wasPressed(" ")) {
            this.jump();
        }
        if (keys.wasPressed("i") || keys.wasPressed("I") || keys.wasPressed("Ш") || keys.wasPressed("ш")) {
            this._isInvincible = !this._isInvincible;
        }
        this.move(dt);
        this._spritesRun.update(dt);
        if (this._isJump) {
            this._sprite = this._jumpSprite;
        }
        else {
            this._sprite = this._spritesRun.current;
        }
        this.hitboxWidht = this._sprite.width;
        this.hitboxHeight = this.hitboxWidht * (this._sprite.height / this._sprite.width);
    }
    draw() {
        this.drawActor();
    }
    onFloor(h) {
        this.y = h;
        this.dy = 0;
        this.d2y = 0;
        this._isJump = false;
        this._isDoubleJump = false;
    }
    jump() {
        if (!this._isJump || !this._isDoubleJump) {
            this.dy = this._jumpSpeed;
            this.d2y = this._gravity;
            this._isDoubleJump = this._isJump;
            this._isJump = true;
        }
    }
}
