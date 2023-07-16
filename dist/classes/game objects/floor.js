import { render, resourses } from "../../engine.js";
import { Actor } from "../core/actor.js";
export class Floor extends Actor {
    constructor(h, color) {
        super(0, 0, h, render.VIRTUAL_WIDTH, color);
        this._sprite = resourses.getSprite("road");
    }
    draw() {
        //this.drawHitbox();
        //this.drawDebug();
        //render.drawPlayerSprite(this._sprite, this.x, this.y, this.hitboxWidht, this.hitboxHeight)
        //render.drawSprite(this._sprite, this.x, this.y)
    }
}
