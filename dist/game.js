import { Floor } from "./classes/floor.js";
import { Player } from "./classes/player.js";
export class GameManager {
    _keys;
    _render;
    _player;
    _floor;
    gravity;
    constructor(render, keys) {
        this._render = render;
        this._keys = keys;
        this.gravity = -this._render.VIRTUAL_HEIGHT * 0.000005;
        let startPossitionY = this._render.VIRTUAL_HEIGHT * 0.15;
        this._player = new Player(this._render, this._keys, this._render.VIRTUAL_WIDTH * 0.15, startPossitionY, this.gravity, this._render.VIRTUAL_HEIGHT * 0.0015, this._render.VIRTUAL_HEIGHT * 0.1, this._render.VIRTUAL_HEIGHT * 0.1, "rgba(255,0,0,0.5)");
        this._floor = new Floor(render, startPossitionY, "rgba(0,255,0,0.5)");
    }
    init() {
    }
    update(dt) {
        this._floor.update(dt);
        this._player.update(dt);
        if (this._player.collides(this._floor) || this._player.y < 0) {
            this._player.onFloor(this._floor.y + this._floor.hitboxHeight);
        }
    }
    draw() {
        this._player.draw();
        this._floor.draw();
    }
}
