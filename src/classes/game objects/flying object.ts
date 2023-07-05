import { render } from "../../engine.js";
import { Actor } from "./actor.js";

export class FlyingObject extends Actor{
    
    private _isDestroy: boolean

    constructor(y: number, h: number, w: number, color: string) {
        super(render.VIRTUAL_WIDTH,y,h,w,color);
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
    }
    
}