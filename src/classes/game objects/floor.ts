import { Actor } from "./actor.js";
import { RenderManager } from "../managers/render.js";

export class Floor extends Actor{

    constructor(render: RenderManager, h: number, color: string){
        super(render, 0,0,h,render.VIRTUAL_WIDTH, color )
    }

    public draw(): void {
        this.drawHitbox();
        //this.drawDebug();
    }
}