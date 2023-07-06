import { FlyingObject } from "./flying object.js";
export class FlyingObjects {
    _objects;
    _timer;
    _spawnTime;
    _createParams;
    constructor(spawnTime, dx, h, w, levelNumber, fH, pH, color) {
        this._objects = new Set();
        this._timer = 0;
        this._spawnTime = spawnTime;
        this._createParams = {
            height: h,
            width: w,
            floorHeight: fH,
            playerHeight: pH,
            color: color,
            speed: dx,
            levelNumber: levelNumber
        };
    }
    get spawntime() {
        return this._spawnTime;
    }
    set spawntime(t) {
        this._spawnTime = t;
    }
    //Над игроком, или на уровне игрока
    static getLevel(levelNumber) {
        let level = FlyingObjects.randomNumber(1, levelNumber);
        return level - (level % 1);
    }
    //Случайная позиция по y
    static randomPositionY(yMin, levelNumber, levelHeight, levelStep) {
        let level = FlyingObjects.getLevel(levelNumber);
        return yMin + (levelHeight + levelStep) * (level - 1) + levelHeight * FlyingObjects.randomNumber(0, 1);
    }
    //Случайное число
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    get obstacles() {
        return this._objects;
    }
    spawn(dt) {
        if (this._timer >= this._spawnTime) {
            let object = new FlyingObject(FlyingObjects.randomPositionY(this._createParams.floorHeight, this._createParams.levelNumber, this._createParams.playerHeight, this._createParams.playerHeight * 0.2), this._createParams.height, this._createParams.width, this._createParams.color);
            object.dx = this._createParams.speed;
            this._objects.add(object);
            this._timer = Math.random() * this._spawnTime / 2;
        }
        else {
            this._timer += dt;
        }
    }
    deleteOrUpdate(dt) {
        this._objects.forEach((value) => {
            if (!value.isDestroy) {
                value.update(dt);
            }
            else {
                this._objects.delete(value);
            }
        });
    }
    update(dt) {
        this.spawn(dt);
        this.deleteOrUpdate(dt);
    }
    draw() {
        this._objects.forEach((value) => {
            if (!value.isDestroy) {
                value.draw();
            }
        });
    }
    collide(actor) {
        let result = false;
        this._objects.forEach((value) => {
            if (!value.isDestroy && actor.collides(value)) {
                value.destroy();
                result = true;
            }
        });
        return result;
    }
}
