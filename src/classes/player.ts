import { Actor } from "./actor.js";
import { KeyManager } from "./keys.js";
import { RenderManager } from "./render.js";

export class Player extends Actor{
    
    private _keys: KeyManager
    private _gravity: number
    private _isJump: boolean
    private _jumpHight: number
    
    constructor(render: RenderManager, keys: KeyManager, x: number, y: number, gravity:number, jumpHight: number, h: number, w: number, color: string){
        super(render, x,y,h,w,color)
        this._keys = keys
        this._gravity = gravity
        this._isJump = false
        this.d2y = this._gravity
        this._jumpHight = jumpHight
    }

    public update(dt: number): void {
        if(this._keys.wasPressed(" ")){
            this.jump(this._jumpHight)
        }

        this.move(dt)

    }

    public draw(): void {
        this.render.drawSquare(this.x, this.y, this.hitboxHeight, this.hitboxWidht, this.hitboxColor)
        let posx = 10
        let posy = 300
        for (let key in this) {
            this.render.drawDebugText(key + ': ' + this[key], posx, posy+this.hitboxHeight)
            posy -= 10
        }
    }

    public onFloor(h: number){
        this.y = h
        this.dy = 0
        this.d2y = 0
        this._isJump = false
    }

    private jump(hight: number){
        if(!this._isJump){
            this.dy = hight
            this.d2y = this._gravity
            this._isJump = true
        } 
    }
}