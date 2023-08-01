import { GameObject } from "../core/game object.js";
import { Level } from "./level.js";

export class LevelMachine extends GameObject{
    private _levels: Map<number, Level>
    private _currentLevel!: Level
    private _currentLevelNumber: number
    private _maxLevelNumber: number
    
    constructor() {
        super()
        this._levels = new Map()
        this._currentLevelNumber = 0
        this._maxLevelNumber = 0
    }

    public get current(): Level{
        return this._currentLevel
    }
    
    public get isLastLevel(): boolean{
        return (this._currentLevelNumber == this._maxLevelNumber)
    }

    public add(level: Level): void{
        this._levels.set(++this._maxLevelNumber, level)
        if(!this._currentLevel){
            this._currentLevel = <Level>this._levels.get(this._maxLevelNumber)
            this._currentLevelNumber = 1
        }
    }

    public next(): void{
        let level = this._levels.get(++this._currentLevelNumber)
        if(level){
            this._currentLevel.exit()
            level.enter(this._currentLevel.background)
            this._currentLevel = level
        }
    }

    public update(dt: number){
        this._currentLevel.update(dt)
    }

    public draw(){
        this._currentLevel.draw()
    }
}