import { keys, render } from "../../../engine.js"
import { Floor } from "../../game objects/floor.js"
import { Obstacles } from "../../game objects/obstacles.js"
import { Player } from "../../game objects/player.js"
import { BaseState } from "./base.js"
import { StateName } from "../names.js"
import { StateMachine } from "../statem.js"
import { BackgroundImage } from "../../game objects/bgimage.js"

export class PlayState extends BaseState{

    //Гравитация
    private _height: number
    private _width: number

    private _player!: Player
    private _floor!: Floor
    private _gravity!:number
    private _gamespeed!: number 
    private _pause!: boolean
    private _obstacles!: Obstacles
    private _background!: BackgroundImage[]

    constructor(states: StateMachine){
        super(states)
        this._height = render.VIRTUAL_HEIGHT
        this._width = render.VIRTUAL_WIDTH
    }

    enter(): void {
        this._pause = false
        let spawnrate = 3
        let targetFPS = 60
        let startPossitionX = this._width*0.15
        let startPossitionY = this._height*0.05
        this._gamespeed = (this._width/targetFPS)*0.05
        this._gravity = -this._width/targetFPS/targetFPS/16
        let jumph = this._width/targetFPS/6
        this._player = new Player(
            startPossitionX,
            startPossitionY,
            this._gravity,
            jumph,
            this._height*0.15,
            this._height*0.08,
            "rgba(255,0,0,0.5)"
            )

        this._floor = new Floor(
            startPossitionY,
            "rgba(255,255,0,0.5)"
        )

        this._obstacles = new Obstacles(
            targetFPS/spawnrate, 
            this._gamespeed,
            this._height*0.05,
            this._height*0.05,
            startPossitionY,
            this._player.hitboxHeight,
            "rgba(0,0,255,0.5)"
        )
        //src\resurses
        //src\classes\state machine\states\play.ts
        this._background = [
            new BackgroundImage("./dist/resurses/1.png",startPossitionY, -this._gamespeed/4),
            new BackgroundImage("./dist/resurses/2.png",startPossitionY,-this._gamespeed/6),
            new BackgroundImage("./dist/resurses/3.png",startPossitionY,-this._gamespeed/8),
            new BackgroundImage("./dist/resurses/4.png",startPossitionY,0)
        ]
    }

    exit(): void {

    }

    update(dt: number): void {
        if(keys.wasPressed("Escape")){
            this._pause = !this._pause 
        }
        if(keys.wasPressed("Enter")){
            this._states.change(StateName.play)
        }

        if(!this._pause){
            this._gamespeed *= 1.00005
            this._floor.update(dt)
            this._player.update(dt)
            this._obstacles.update(dt)

            if(this._player.collides(this._floor) || this._player.y < 0){
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight)
            }

            if(this._obstacles.collide(this._player) && !this._player.isInvincible){
                this._states.change(StateName.lose)
            }

            let i: number
            for(i = 0; i < this._background.length; i++){
                this._background[i].dx *=  1.00005
                this._background[i].update(dt)
            }
        }
    }

    draw(): void {
        let i: number
        for(i = this._background.length-1; i >= 0 ; i--){
            this._background[i].draw()
        }

        this._player.draw()
        this._floor.draw()
        this._obstacles.draw()
    }
}