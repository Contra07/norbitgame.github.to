import { Actor } from "../core/actor.js";
import { FlyingObject } from "./flying object.js";

export class FlyingObjects {
    private _objects: Set<FlyingObject>
    private _timer: number
    private _spawnTime: number
    private _createParams: CreateParams

    constructor(spawnTime: number, dx: number, h: number, w: number, levelNumber: number, fH: number, pH: number, color: string) {
        this._objects = new Set<FlyingObject>()
        this._timer = 0
        this._spawnTime = spawnTime
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
    protected static getLevel(levelNumber: number):number {
        let level = FlyingObjects.randomNumber(1, levelNumber)
        return level - (level % 1)
    }

    //Случайная позиция по y
    protected static randomPositionY(yMin: number, levelNumber: number, levelHeight: number, levelStep: number): number {
        let level = FlyingObjects.getLevel(levelNumber)
        return yMin + (levelHeight + levelStep) * (level-1) + levelHeight * FlyingObjects.randomNumber(0,1)
    }

    //Случайное число
    protected static randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public get obstacles() {
        return this._objects
    }

    

    protected spawn(dt: number): void {
        if (this._timer >= this._spawnTime) {
            let object = new FlyingObject(
                FlyingObjects.randomPositionY(
                    this._createParams.floorHeight, 
                    this._createParams.levelNumber, 
                    this._createParams.playerHeight,
                    this._createParams.playerHeight*0.2,
                    ),
                this._createParams.height,
                this._createParams.width,
                this._createParams.color
            )
            object.dx = this._createParams.speed
            this._objects.add(object)
            this._timer = Math.random() * this._spawnTime / 2
        }
        else {
            this._timer += dt
        }
    }

    protected deleteOrUpdate(dt: number): void {
        this._objects.forEach(
            (value: FlyingObject) => {
                if (!value.isDestroy) {
                    value.update(dt)
                }
                else {
                    this._objects.delete(value)
                }
            }
        )
    }

    public update(dt: number): void {
        this.spawn(dt)
        this.deleteOrUpdate(dt)
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


