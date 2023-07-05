import { keys, render } from "../../../engine.js"
import { Floor } from "../../game objects/floor.js"
import { FlyingObjects } from "../../game objects/flying objects.js"
import { Player } from "../../game objects/player.js"
import { BaseState } from "./base.js"
import { StateName } from "../names.js"
import { StateMachine } from "../statem.js"
import { BackgroundSprite } from "../../game objects/background sprite.js"

export class PlayState extends BaseState{

    //Типа константы
    private _gravity:number = -3000
    private _gamespeed: number = 500
    private _height: number = render.VIRTUAL_HEIGHT
    private _width: number = render.VIRTUAL_WIDTH
    private _pause: boolean = false
    private _targetFPS: number = 60

    //Игрок
    private _startPossitionX: number = this._width*0.15
    private _startPossitionY: number = this._height*0.05
    private _playerHitboxH = this._height*0.15
    private _playerHitboxW = this._width*0.08
    private _jumpHight: number = 150

    //Препятствия
    private _obstacleHitboxH = this._height*0.05
    private _obstacleHitboxW = this._width*0.05
    private _spawntime: number = 2

    //Сущности
    private _floor!: Floor
    private _player!: Player
    private _coins!: FlyingObjects
    private _obstacles!: FlyingObjects
    private _background!: BackgroundSprite[]
    private _coinCounter!: number

    constructor(states: StateMachine){
        super(states)
    }

    enter(): void {
        this._pause = false
        this._player = new Player(
            this._startPossitionX,
            this._startPossitionY,
            this._gravity,
            this._jumpHight,
            this._playerHitboxH,
            this._playerHitboxW,
            "rgba(255,0,0,0.5)"
            )

        this._floor = new Floor(
            this._startPossitionY,
            "rgba(255,255,0,0.5)"
        )

        this._obstacles = new FlyingObjects(
            this._spawntime, 
            -this._width,
            -this._width*0.0001,
            this._obstacleHitboxH,
            this._obstacleHitboxW,
            this._startPossitionY,
            this._player.hitboxHeight,
            "rgba(0,0,255,0.5)"
        )

        this._coins = new FlyingObjects(
            this._spawntime*2, 
            -this._width,
            -this._width*0.0001,
            this._obstacleHitboxH,
            this._obstacleHitboxW,
            this._startPossitionY,
            this._player.hitboxHeight,
            "rgba(0,255,255,0.5)"
        )

        this._background = [
            new BackgroundSprite("./dist/resurses/1.png",this._startPossitionY, -this._gamespeed/4),
            new BackgroundSprite("./dist/resurses/2.png",this._startPossitionY,-this._gamespeed/6),
            new BackgroundSprite("./dist/resurses/3.png",this._startPossitionY,-this._gamespeed/8),
            new BackgroundSprite("./dist/resurses/4.png",this._startPossitionY,0)
        ]

        this._coinCounter = 0
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
            this._coins.update(dt)

            if(this._player.collides(this._floor) || this._player.y < 0){
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight)
            }

            if(this._obstacles.collide(this._player) && !this._player.isInvincible){
                this._states.change(StateName.lose)
            }
            
            if(this._coins.collide(this._player)){
                this._coinCounter++
            }

            let i: number
            for(i = 0; i < this._background.length; i++){
                this._background[i].dx *=  1.00001
                this._background[i].update(dt)
            }
        }
    }

    draw(): void {
        let i: number
        for(i = this._background.length-1; i >= 0 ; i--){
            this._background[i].draw()
        }

        
        this._floor.draw()
        this._obstacles.draw()
        this._coins.draw()
        this._player.draw()

        render.drawMiddleText("Монет: " + this._coinCounter, 0, this._height - 200)
    }
}