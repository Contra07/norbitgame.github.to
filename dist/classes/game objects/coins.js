import { Obstacles } from "./obstacles.js";
export class Coins extends Obstacles {
    constructor(spawnTime, dx, d2x, h, w, fH, pH, color) {
        super(spawnTime, dx, d2x, h, w, fH, pH, color);
    }
}
