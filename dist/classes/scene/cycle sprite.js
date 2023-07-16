import { GameObject } from "../core/game object.js";
export class CycleSprite extends GameObject {
    _sprites;
    _current;
    _currentNumber;
    _spritesNumber;
    _timer;
    _frametime;
    constructor(sprites, frametime) {
        super();
        this._sprites = sprites;
        this._current = this._sprites[0];
        this._currentNumber = 0;
        this._spritesNumber = this._sprites.length;
        this._timer = 0;
        this._frametime = frametime;
    }
    update(dt) {
        this._timer += dt;
        if (this._timer > this._frametime) {
            this._currentNumber = ++this._currentNumber % this._spritesNumber;
            this._current = this._sprites[this._currentNumber];
        }
        this._timer = this._timer % this._frametime;
    }
    get current() {
        return this._current;
    }
}
