import { keys, render } from "../../engine.js";
import { Actor } from "../core/actor.js";
import { Sprite } from "../core/sprite.js";

export class Player extends Actor{
    //Атрибуты
    private _gravity: number
    private _jumpSpeed: number

    //Состояния
    private _isDoubleJump: boolean
    private _isJump: boolean
    private _isInvincible: boolean
    
    constructor(x: number, y: number, gravity:number, jumpHeight: number, h: number, w: number, color: string){
        super(x,y,h,w,color)
        this._gravity = gravity
        this._isJump = false
        this.d2y = this._gravity
        this._jumpSpeed = Math.sqrt(2*jumpHeight*gravity*(-1))
        this._isDoubleJump = false
        this._isInvincible = false
        this._sprite = new Sprite("./dist/resurses/player.png")
        this.hitboxWidht = this._sprite.width
        this.hitboxHeight = this.hitboxWidht*(this._sprite.height / this._sprite.width)
    }

    public get isInvincible(): boolean{
        return this._isInvincible
    }

    public update(dt: number): void {
        if(keys.wasPressed(" ")){
            this.jump()
        }
        if(keys.wasPressed("i") || keys.wasPressed("I") || keys.wasPressed("Ш") || keys.wasPressed("ш")){
            this._isInvincible = !this._isInvincible
        }
        this.move(dt)
    }

    public draw(): void {
        //render.drawSquare(this.x, this.y, this.hitboxHeight, this.hitboxWidht, this.hitboxColor)
        render.drawPlayerSprite(this._sprite, this.x, this.y, this.hitboxWidht, this.hitboxHeight)
    }

    public onFloor(h: number){
        this.y = h
        this.dy = 0
        this.d2y = 0
        this._isJump = false
        this._isDoubleJump = false
    }

    private jump(){
        if(!this._isJump || !this._isDoubleJump){
            this.dy = this._jumpSpeed
            this.d2y = this._gravity
            this._isDoubleJump = this._isJump
            this._isJump = true
        }
    }
}