import { FlyingObject } from "./flying object.js";
export class FlyingObjects {
    _obstacles;
    _timer;
    _spawnTime;
    _createParams;
    constructor(spawnTime, dx, h, w, fH, pH, color) {
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
        };
    }
    get spawntime() {
        return this._spawnTime;
    }
    set spawntime(t) {
        this._spawnTime * 2;
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
    static mulberry32(a) {
        let t = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
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
            this._obstacles.add(obstacle);
            this._timer = Math.random() * this._spawnTime / 2;
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
