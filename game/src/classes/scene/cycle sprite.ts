import { GameObject } from "../core/game object.js";
import { Sprite } from "../core/sprite.js";

export class CycleSprite extends GameObject{

    private _sprites: Sprite[]
    private _current: Sprite
    private _currentNumber: number
    private _spritesNumber: number
    private _timer: number
    private _frametime: number

    constructor(sprites: Sprite[], frametime: number){
        super()
        this._sprites = sprites
        this._current = this._sprites[0]
        this._currentNumber = 0
        this._spritesNumber = this._sprites.length
        this._timer = 0
        this._frametime = frametime
    }

    public update(dt: number): void {
        this._timer += dt
        if(this._timer > this._frametime){
            this._currentNumber = ++this._currentNumber % this._spritesNumber
            this._current = this._sprites[this._currentNumber]
        }
        while(this._timer > this._frametime){
            this._timer = this._timer % this._frametime
        }
    }

    public get current(): Sprite{
        return this._current
    }
}