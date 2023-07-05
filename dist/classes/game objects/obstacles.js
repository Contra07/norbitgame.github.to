import { FlyingObject } from "./flying object.js";
export class FlyingObjects {
    _obstacles;
    _timer;
    _spawnTime;
    _createParams;
    constructor(spawnTime, dx, d2x, h, w, fH, pH, color) {
        this._obstacles = new Set();
        this._timer = 0;
        this._spawnTime = spawnTime;
        this._createParams = {
            height: h,
            width: w,
            floorHeight: fH,
            playerHeight: pH,
            color: color,
            speed: dx,
            acs: d2x
        };
    }
    static startY(fH, ph) {
        let y;
        let line = FlyingObjects.randomNumber(-1, 1);
        if (line < 0.75) {
            y = fH + FlyingObjects.randomNumber(0, ph * 0.8);
        }
        else {
            y = fH + ph * 1.2 + FlyingObjects.randomNumber(0, ph);
        }
        return y;
    }
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    get obstacles() {
        return this._obstacles;
    }
    spawn(dt) {
        if (this._timer >= this._spawnTime) {
            let obstacle = new FlyingObject(FlyingObjects.startY(this._createParams.floorHeight, this._createParams.playerHeight), this._createParams.height, this._createParams.width, this._createParams.color);
            obstacle.dx = this._createParams.speed;
            obstacle.d2x = this._createParams.acs;
            this._createParams.speed += dt * this._createParams.acs;
            this._obstacles.add(obstacle);
            this._timer = 0;
        }
        else {
            this._timer += dt;
        }
    }
    deleteOrUpdate(dt) {
        this._obstacles.forEach((value) => {
            if (!value.isDestroy) {
                value.update(dt);
            }
            else {
                this._obstacles.delete(value);
            }
        });
    }
    update(dt) {
        this.spawn(dt);
        this.deleteOrUpdate(dt);
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
