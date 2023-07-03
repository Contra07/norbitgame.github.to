import { RenderManager } from "../managers/render";
import { Actor } from "./actor";
import { Obstacle } from "./obstacle.js";

type CreateParams = {
    height: number
    width: number
    floorHeight: number
    playerHeight: number
    color: string
}

export class Obstacles{
    private _obstacles: Set<Obstacle>
    private _timer: number
    private _spawnTime: number
    private _render: RenderManager
    private _step: number
    private _createParams: CreateParams

    constructor(render: RenderManager, spawnTime: number, step: number, h1: number, w: number, fH:number, pH: number, color: string) {
        this._obstacles = new Set<Obstacle>()
        this._timer = 0
        this._spawnTime = spawnTime 
        this._render = render
        this._step = step
        this._createParams = {
            height: h1,
            width: w,
            floorHeight: fH,
            playerHeight: pH,
            color: color
        }
            
    }

    private static startY(fH: number, ph: number):number{
        let y: number
        let line = Obstacles.randomNumber(-1,1)
        if(line < 0.5){
            y = fH + Obstacles.randomNumber(0,ph*0.8)
        }
        else{
            y = fH + ph*1.2+ Obstacles.randomNumber(0,ph*0.8)
        }
        return y
    }
    
    private static randomNumber(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public get obstacles(){
        return this._obstacles
    }

    public update(dt:number): void{
        if(this._timer >= this._spawnTime){
            let obstacle = new Obstacle(
                this._render,
                Obstacles.startY(this._createParams.floorHeight, this._createParams.playerHeight),
                this._createParams.height,
                this._createParams.width,
                this._createParams.color
            )
            obstacle.dx = - this._render.VIRTUAL_WIDTH/1000
            this._obstacles.add(obstacle)
            this._timer = 0
        }
        else{
            this._timer += this._step
        }
        this._obstacles.forEach(
            (value: Obstacle) => {
                if(!value.isDestroy){
                    value.update(dt)
                }
                else{
                    this._obstacles.delete(value)
                }
            }
        )
    }

    public draw(): void{
        this._obstacles.forEach(
            (value:Obstacle) =>{
                if(!value.isDestroy){
                    value.draw()
                }
            }
        )
    }
    
    public collide(actor: Actor): boolean{
        let result: boolean = false
        this._obstacles.forEach(
            (value:Obstacle) =>{
                if(!value.isDestroy && actor.collides(value)){
                    value.destroy()
                    result = true
                }
            }
        )
        return result
    }

}

