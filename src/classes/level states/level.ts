import { BackgroundScrollingLayer} from "../game objects/background layer.js"
import { FlyingObjects } from "../game objects/flying objects.js";
import { StateMachine } from "../state machine/machine.js";
import { State } from "../state machine/state.js";

export class Level extends State{
    
    //TODO: Transition
    //TODO: Level mashine class

    //Сущности
    private _coins: FlyingObjects
    private _obstacles: FlyingObjects
    private _background: BackgroundScrollingLayer[]

    private _levelTimer: number
    private _transitionTime: number

    constructor(states: StateMachine, levelTimer: number, coins: FlyingObjects, obstacles: FlyingObjects, background: BackgroundScrollingLayer[]) {
        super(states)
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

    public get background(): BackgroundScrollingLayer[]{
        return this._background
    }

    public init(): void {
        
    }

    public enter(params?: any): void {
        if(params){
            let levelP: Level = <Level> params;
            let levelC: Level =(<Level>this._states.current)
            let i = 0
            for(i = 0; i <  levelC._background.length; i++){
                levelC._background[i].transition(levelP._background[i])
            }
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