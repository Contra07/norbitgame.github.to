import { GameObject } from "../../core/game object.js";
export class FlyingObjects extends GameObject {
    _objects;
    _refObjects;
    _timer;
    _spawnTime;
    _isSpawn;
    constructor(refObjects, isSpawn, spawnTime) {
        super();
        this._refObjects = refObjects;
        this._objects = new Set();
        this._timer = 0;
        this._spawnTime = spawnTime;
        this._isSpawn = isSpawn;
    }
    //Случайное число
    static randomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    startSpawn() {
        this._isSpawn = true;
    }
    stopSpawn() {
        this._isSpawn = false;
    }
    spawnObject() {
        let i = FlyingObjects.randomNumber(0, this._refObjects.length);
        i = i - (i % 1);
        let object = this._refObjects[i].spawn();
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
