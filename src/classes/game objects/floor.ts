import { render } from "../../engine.js";
import { Actor } from "./actor.js";

export class Floor extends Actor{

    constructor(h: number, color: string){
        super(0,0,h,render.VIRTUAL_WIDTH, color )
    }

    public draw(): void {
        this.drawHitbox();
        //this.drawDebug();
    }
}