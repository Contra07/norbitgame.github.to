import { Actor } from "../core/actor.js";
import { GameObject } from "../core/game object.js";
import { Sprite } from "../core/sprite.js";
import { FlyingObject } from "./flying object.js";

export class FlyingObjects extends GameObject{
    private _objects: Set<FlyingObject>
    private _refObject: FlyingObject
    private _timer: number
    private _spawnTime: number
    private _isSpawn: boolean
    private _createParams: CreateParams
    private _objectSpeed: number

    constructor(isSpawn: boolean, spawnTime: number, dx: number, h: number, w: number, levelNumber: number, fH: number, pH: number, color: string, sprite?: Sprite) {
        super()
        this._objects = new Set<FlyingObject>()
        this._timer = 0
        this._spawnTime = spawnTime
        this._isSpawn = isSpawn
        this._objectSpeed = dx
        this._refObject = new FlyingObject(
            FlyingObjects.randomPositionY(fH, levelNumber, pH,pH*0.2,),
            h,
            w,
            color,
            sprite
        )
        this._createParams = {
            height: h,
            width: w,
            floorHeight: fH,
            playerHeight: pH,
            color: color,
            speed: dx,
            levelNumber: levelNumber
        }
    }

    public get spawntime():number{
        return this._spawnTime
    }

    public set spawntime(t:number){
        this._spawnTime = t
    }

    //Над игроком, или на уровне игрока
    private static getLevel(levelNumber: number):number {
        let level = FlyingObjects.randomNumber(1, levelNumber)
        return level - (level % 1)
    }

    //Случайная позиция по y
    private static randomPositionY(yMin: number, levelNumber: number, levelHeight: number, levelStep: number): number {
        let level = FlyingObjects.getLevel(levelNumber)
        return yMin + (levelHeight + levelStep) * (level-1) + levelHeight * FlyingObjects.randomNumber(0,1)
    }

    //Случайное число
    private static randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public get obstacles() {
        return this._objects
    }

    public startSpawn(): void{
        this._isSpawn = true
    }

    public stopSpawn(): void{
        this._isSpawn = false
    } 

    private spawnObject(): void{
        let object = this._refObject.copy()
        object.y = FlyingObjects.randomPositionY(this._createParams.floorHeight, this._createParams.levelNumber, this._createParams.playerHeight,this._createParams.playerHeight*0.2,),
        object.dx = this._objectSpeed
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

type CreateParams = {
    height: number
    width: number
    floorHeight: number
    playerHeight: number
    color: string
    speed: number
    levelNumber: number
}


