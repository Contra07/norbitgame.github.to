import { Obstacle } from "./obstacle.js";
export class Obstacles {
    _obstacles;
    _timer;
    _spawnTime;
    _render;
    _step;
    _createParams;
    constructor(render, spawnTime, step, h1, w, fH, pH, color) {
        this._obstacles = new Set();
        this._timer = 0;
        this._spawnTime = spawnTime;
        this._render = render;
        this._step = step;
        this._createParams = {
            height: h1,
            width: w,
            floorHeight: fH,
            playerHeight: pH,
            color: color
        };
    }
    static startY(fH, ph) {
        let y;
        let line = Obstacles.randomNumber(-1, 1);
        if (line < 0.5) {
            y = fH + Obstacles.randomNumber(0, ph * 0.8);
        }
        else {
            y = fH + ph * 1.2 + Obstacles.randomNumber(0, ph * 0.8);
        }
        return y;
    }
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    get obstacles() {
        return this._obstacles;
    }
    update(dt) {
        if (this._timer >= this._spawnTime) {
            let obstacle = new Obstacle(this._render, Obstacles.startY(this._createParams.floorHeight, this._createParams.playerHeight), this._createParams.height, this._createParams.width, this._createParams.color);
            obstacle.dx = -this._render.VIRTUAL_WIDTH / 1000;
            this._obstacles.add(obstacle);
            this._timer = 0;
        }
        else {
            this._timer += this._step;
        }
        this._obstacles.forEach((value) => {
            if (!value.isDestroy) {
                value.update(dt);
            }
            else {
                this._obstacles.delete(value);
            }
        });
    }
    draw() {
        this._obstacles.forEach((value) => {
            if (!value.isDestroy) {
                value.draw();
            }
        });
    }
    collide(actor) {
        let result = false;
        this._obstacles.forEach((value) => {
            if (!value.isDestroy && actor.collides(value)) {
                value.destroy();
                result = true;
            }
        });
        return result;
    }
}
