import { GameObject } from "../core/game object.js";
import { FlyingObject } from "./flying object.js";
export class FlyingObjects extends GameObject {
    _objects;
    _refObject;
    _timer;
    _spawnTime;
    _isSpawn;
    _createParams;
    _objectSpeed;
    constructor(isSpawn, spawnTime, dx, h, w, levelNumber, fH, pH, color) {
        super();
        this._objects = new Set();
        this._timer = 0;
        this._spawnTime = spawnTime;
        this._isSpawn = isSpawn;
        this._objectSpeed = dx;
        this._refObject = new FlyingObject(FlyingObjects.randomPositionY(fH, levelNumber, pH, pH * 0.2), h, w, color);
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
    startSpawn() {
        this._isSpawn = true;
    }
    stopSpawn() {
        this._isSpawn = false;
    }
    spawnObject() {
        let object = this._refObject.copy();
        object.y = FlyingObjects.randomPositionY(this._createParams.floorHeight, this._createParams.levelNumber, this._createParams.playerHeight, this._createParams.playerHeight * 0.2),
            object.dx = this._objectSpeed;
        this._objects.add(object);
    }
    resetTimer() {
        this._timer = Math.random() * this._spawnTime / 2;
    }
    deleteObjects() {
        this._objects.forEach((value) => {
            if (value.isDestroy) {
                this._objects.delete(value);
            }
        });
    }
    updateObjects(dt) {
        this._objects.forEach((value) => {
            if (!value.isDestroy) {
                value.update(dt);
            }
        });
    }
    update(dt) {
        if (this._timer >= this._spawnTime) {
            if (this._isSpawn) {
                this.spawnObject();
            }
            this.resetTimer();
        }
        else {
            this._timer += dt;
        }
        this.updateObjects(dt);
        this.deleteObjects();
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
