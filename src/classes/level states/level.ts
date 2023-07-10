import { BackgroundLayer} from "../game objects/background layer.js"
import { FlyingObjects } from "../game objects/flying objects.js";
import { LevelMachine } from "./level machine.js";

export class Level{
    
    //TODO: Transition

    //Уровни
    private _levels: LevelMachine

    //Сущности
    private _coins: FlyingObjects
    private _obstacles: FlyingObjects
    private _background: BackgroundLayer[]

    //Таймеры
    private _levelTimer: number
    private _transitionTime: number

    constructor(levels: LevelMachine, levelTimer: number, coins: FlyingObjects, obstacles: FlyingObjects, background: BackgroundLayer[]) {
        this._levels = levels
        this._levelTimer = levelTimer
        this._coins = coins
        this._obstacles = obstacles
        this._background = background
        this._transitionTime = 0
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

    public isEnd(){
        return this._levelTimer < 0
    }

    public update(dt: number): void {
        this._levelTimer -= dt
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