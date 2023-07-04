import { render } from "../../engine.js";
import { Actor } from "./actor.js";
export class Floor extends Actor {
    constructor(h, color) {
        super(0, 0, h, render.VIRTUAL_WIDTH, color);
    }
    draw() {
        this.drawHitbox();
        //this.drawDebug();
    }
}
