import { render } from "../../engine.js";
import { BackgroundLayer} from "../scene/background layer.js"
import { FlyingObjects } from "../scene/flying objects/flying objects.js";
import { LevelMachine } from "./level machine.js";

export class Level{
    //Уровни
    private _levels: LevelMachine

    //Сущности
    private _coins: FlyingObjects
    private _obstacles: FlyingObjects
    private _background: BackgroundLayer[]

    //Таймеры
    private _levelTimer: number
    private _transitionBeginTime: number
    private _transitionEndTime: number

    constructor(levels: LevelMachine, levelTimer: number, gamespeed: number, coins: FlyingObjects, obstacles: FlyingObjects, background: BackgroundLayer[]) {
        this._levels = levels
        this._levelTimer = levelTimer
        this._coins = coins
        this._obstacles = obstacles
        this._background = background
        this._transitionBeginTime = render.VIRTUAL_WIDTH/gamespeed
        this._transitionEndTime = render.VIRTUAL_WIDTH/gamespeed
    }

    public get obstacles(): FlyingObjects{
        return this._obstacles
    }

    public get coins(): FlyingObjects{
        return this._coins
    }

    public get background(): BackgroundLayer[]{
        return this._background
    }

    public get isMainEnd() {
        return this._levelTimer < 0
    }

    public get isBeginEnd(){
        return this._transitionBeginTime < 0
    }

    public get isEndEnd(){
        return this._transitionEndTime < 0
    }

    public init(): void {
        
    }

    public enter(layers: BackgroundLayer[]): void {
        let i: number
        for(i = 0; i <  this._background.length; i++){
            this._background[i].transition(layers[i])
        }
    }

    public exit(): void {
        
    }

    public update(dt: number): void {
        if(!this.isBeginEnd){
            this._transitionBeginTime -= dt
            this._obstacles.stopSpawn()
            this._coins.stopSpawn()
        }
        else if(!this.isMainEnd) {
            this._levelTimer -= dt
            this._obstacles.startSpawn()
            this._coins.startSpawn()
        }
        else if(!this.isEndEnd){
            this._transitionEndTime -= dt
            this._obstacles.stopSpawn()
            this._coins.stopSpawn()
        }
        this._obstacles.update(dt)
        this._coins.update(dt)
        let i: number
        for(i = 0; i < this._background.length; i++){
            this._background[i].update(dt)
        }
    }

    public draw(): void {
        let i: number
        for(i = this._background.length-1; i >= 0 ; i--){
            this._background[i].draw()
        }
        this._obstacles.draw()
        this._coins.draw()
    }
}