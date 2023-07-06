import { Actor } from "./actor.js";
import { FlyingObject } from "./flying object.js";

type CreateParams = {
    height: number
    width: number
    floorHeight: number
    playerHeight: number
    color: string
    speed: number
}

export class FlyingObjects {
    private _obstacles: Set<FlyingObject>
    private _timer: number
    private _spawnTime: number
    private _createParams: CreateParams

    constructor(spawnTime: number, dx: number, h: number, w: number, fH: number, pH: number, color: string) {
        this._obstacles = new Set<FlyingObject>()
        this._timer = 0
        this._spawnTime = spawnTime
        this._createParams = {
            height: h,
            width: w,
            floorHeight: fH,
            playerHeight: pH,
            color: color,
            speed: dx,
        }
    }

    public get spawntime():number{
        return this._spawnTime
    }

    public set spawntime(t:number){
        this._spawnTime*2
    }


    private static startY(fH: number, ph: number): number {
        let y: number
        let line = FlyingObjects.randomNumber(-1, 1)
        if (line < 0.75) {
            y = fH + FlyingObjects.randomNumber(0, ph * 0.8)
        }
        else {
            y = fH + ph * 1.2 + FlyingObjects.randomNumber(0, ph)
        }
        return y
    }

    private static mulberry32(a: number):number {
        let t:number = a += 0x6D2B79F5;
        t = Math.imul(t ^ t >>> 15, t | 1);
        t ^= t + Math.imul(t ^ t >>> 7, t | 61);
        return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }

    private static randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public get obstacles() {
        return this._obstacles
    }

    protected spawn(dt: number): void {
        if (this._timer >= this._spawnTime) {
            let obstacle = new FlyingObject(
                FlyingObjects.startY(this._createParams.floorHeight, this._createParams.playerHeight),
                this._createParams.height,
                this._createParams.width,
                this._createParams.color
            )
            obstacle.dx = this._createParams.speed
            this._obstacles.add(obstacle)
            this._timer = Math.random() * this._spawnTime / 2
        }
        else {
            this._timer += dt
        }
    }

    protected deleteOrUpdate(dt: number): void {
        this._obstacles.forEach(
            (value: FlyingObject) => {
                if (!value.isDestroy) {
                    value.update(dt)
                }
                else {
                    this._obstacles.delete(value)
                }
            }
        )
    }

    public update(dt: number): void {
        this.spawn(dt)
        this.deleteOrUpdate(dt)
    }

    public draw(): void {
        this._obstacles.forEach(
            (value: FlyingObject) => {
                if (!value.isDestroy) {
                    value.draw()
                }
            }
        )
    }

    public collide(actor: Actor): boolean {
        let result: boolean = false
        this._obstacles.forEach(
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

