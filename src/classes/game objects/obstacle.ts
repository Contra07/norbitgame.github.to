import { RenderManager } from "../managers/render.js";
import { Actor } from "./actor.js";

export class Obstacle extends Actor{
    
    private _isDestroy: boolean

    constructor(render: RenderManager,y: number, h: number, w: number, color: string) {
        super(render,render.VIRTUAL_WIDTH,y,h,w,color);
        this._isDestroy = false
    }

    public get isDestroy(): boolean{
        return this._isDestroy
    }

    public destroy(){
        this._isDestroy = true
    }

    public update(dt: number): void {
        this.move(dt)
        if(this.x + this.hitboxWidht < 0){
            this.destroy()
        }
    }

    public draw(): void {
        if(!this._isDestroy){
            this.drawHitbox()
        }
        let posx = 10
        let posy = 300
        for (let key in this) {
            this.render.drawDebugText(key + ': ' + this[key], posx, posy+this.hitboxHeight)
            posy -= 10
        }
    }
    
}