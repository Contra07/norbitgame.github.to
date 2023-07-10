import { StateMachine } from "./state machine/machine.js";
import { EndState } from "./game states/end.js";
import { PlayState } from "./game states/play.js";
import { TitleState } from "./game states/title.js";

//TODO: Singleton game

export class GameManager{
    private _gameStates: StateMachine

    constructor(){
        this._gameStates = new StateMachine()
    }

    public init(){
        if( this._gameStates.add("play", new PlayState(this._gameStates))
            &&  this._gameStates.add("end", new EndState(this._gameStates))
            &&  this._gameStates.add("title", new TitleState(this._gameStates))
        ){
            this._gameStates.change("play")
        }
        else{
            console.log("Game states error")
        }
    }

    public update(dt: number){
        this._gameStates.update(dt)
    }

    public draw(){
        this._gameStates.draw()
    }
}