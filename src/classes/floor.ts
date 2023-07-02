import { Actor } from "./actor.js";
import { Render } from "./render.js";

export class Floor extends Actor{

    constructor(render: Render, h: number, color: string){
        super(render, 0,0,h,render.VIRTUAL_WIDTH, color )
    }

    public draw(): void {
        this.drawHitbox();
        this.drawDebug();
    }
}