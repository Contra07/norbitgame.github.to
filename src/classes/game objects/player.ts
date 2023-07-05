import { keys, render } from "../../engine.js";
import { Actor } from "./actor.js";

export class Player extends Actor{
    private _gravity: number
    private _jumpHight: number

    private _isDoubleJump: boolean
    private _isJump: boolean
    private _isInvincible: boolean
    
    constructor(x: number, y: number, gravity:number, jumpHight: number, h: number, w: number, color: string){
        super(x,y,h,w,color)
        this._gravity = gravity
        this._isJump = false
        this.d2y = this._gravity
        this._jumpHight = jumpHight
        this._isDoubleJump = false
        this._isInvincible = false
    }

    public get isInvincible(): boolean{
        return this._isInvincible
    }

    public update(dt: number): void {
        if(keys.wasPressed(" ")){
            this.jump(this._jumpHight)
        }

        if(keys.wasPressed("i") || keys.wasPressed("I")){
            this._isInvincible = !this._isInvincible
        }

        this.move(dt)

    }

    public draw(): void {
        render.drawSquare(this.x, this.y, this.hitboxHeight, this.hitboxWidht, this.hitboxColor)
        //let posx = 10
        //let posy = 300
        //for (let key in this) {
        //    this.render.drawDebugText(key + ': ' + this[key], posx, posy+this.hitboxHeight)
        //    posy -= 10
        //}
    }

    public onFloor(h: number){
        this.y = h
        this.dy = 0
        this.d2y = 0
        this._isJump = false
        this._isDoubleJump = false
    }

    private jump(hight: number){
        if(this._isJump && !this._isDoubleJump){
            this.dy = hight
            this.d2y = this._gravity
            this._isDoubleJump = true
        }
        if(!this._isJump){
            this.dy = hight
            this.d2y = this._gravity
            this._isJump = true
        }


    }
}