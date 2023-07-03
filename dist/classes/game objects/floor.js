import { Actor } from "./actor.js";
export class Floor extends Actor {
    constructor(render, h, color) {
        super(render, 0, 0, h, render.VIRTUAL_WIDTH, color);
    }
    draw() {
        this.drawHitbox();
        //this.drawDebug();
    }
}
