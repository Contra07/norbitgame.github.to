import { Actor } from "../../core/actor.js";
import { GameObject } from "../../core/game object.js";
import { FlyingObject } from "./flying object.js";

export class FlyingObjects extends GameObject{
    private _objects: Set<FlyingObject>
    private _refObjects: FlyingObject[]
    private _timer: number
    private _spawnTime: number
    private _isSpawn: boolean

    constructor(refObjects: FlyingObject[], isSpawn: boolean, spawnTime: number) {
        super()
        this._refObjects = refObjects
        this._objects = new Set<FlyingObject>()
        this._timer = 0
        this._spawnTime = spawnTime
        this._isSpawn = isSpawn
    }

    //Случайное число
    public static randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public startSpawn(): void{
        this._isSpawn = true
    }

    public stopSpawn(): void{
        this._isSpawn = false
    } 

    private spawnObject(): void{
        let i = FlyingObjects.randomNumber(0, this._refObjects.length)
        i = i - (i % 1)
        let object = this._refObjects[i].spawn()
        this._objects.add(object)
    }

    private resetTimer(): void{
        this._timer = Math.random() * this._spawnTime / 2
    }

    private deleteObjects(): void {
        this._objects.forEach(
            (value: FlyingObject) => {
                if (value.isDestroy) {
                    this._objects.delete(value)
                }
            }
        )
    }

    private updateObjects(dt: number): void {
        this._objects.forEach(
            (value: FlyingObject) => {
                if (!value.isDestroy) {
                    value.update(dt)
                }
            }
        )
    }

    public update(dt: number): void {
        if (this._timer >= this._spawnTime) {
            if(this._isSpawn){
                this.spawnObject()
            }
            this.resetTimer()
        }
        else {
            this._timer += dt
        }
        this.updateObjects(dt)
        this.deleteObjects()
    }

    public draw(): void {
        this._objects.forEach(
            (value: FlyingObject) => {
                if (!value.isDestroy) {
                    value.draw()
                }
            }
        )
    }

    public collide(actor: Actor): boolean {
        let result: boolean = false
        this._objects.forEach(
            (value: FlyingObject) => {
                if (!value.isDestroy && actor.collides(value)) {
                    value.destroy()
                    result = true
                }
            }
        )
        return result
    }
}

