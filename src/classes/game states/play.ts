import { keys, render } from "../../engine.js"
import { Floor } from "../game objects/floor.js"
import { FlyingObjects } from "../game objects/flying objects.js"
import { Player } from "../game objects/player.js"
import { State } from "../state machine/state.js"
import { StateMachine } from "../state machine/machine.js"
import { BackgroundSprite } from "../core/background sprite.js"
import { Level } from "../level states/level.js"

export class PlayState extends State{

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

    //Уровни 
    private _levels!: StateMachine

    //Очки
    private _coinCounter!: number
    private _lifesCounter!: number

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

        this._coinCounter = 0
        this._lifesCounter = 3

        this._levels = new StateMachine()
        this._levels.add(
            "stage1", 
            new Level(
                this._levels,
                10,
                new FlyingObjects(
                    this._spawntime*2, 
                    -this._width,
                    this._obstacleHitboxH*1.2,
                    this._obstacleHitboxW,
                    3,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,255,120,0.5)"
                ),
                new FlyingObjects(
                    this._spawntime, 
                    -this._width,
                    this._obstacleHitboxH,
                    this._obstacleHitboxW,
                    2,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,0,255,0.5)"
                ),
                [
                    new BackgroundSprite("./dist/resurses/1.png",this._startPossitionY, -this._gamespeed/4),
                    new BackgroundSprite("./dist/resurses/2.png",this._startPossitionY,-this._gamespeed/6),
                    new BackgroundSprite("./dist/resurses/4.png",this._startPossitionY,0)
                ]
            )
        )
        this._levels.add(
            "stage2", 
            new Level(
                this._levels,
                10000000000000,
                new FlyingObjects(
                    this._spawntime*2, 
                    -this._width,
                    this._obstacleHitboxH*1.2,
                    this._obstacleHitboxW,
                    3,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,255,120,0.5)"
                ),
                new FlyingObjects(
                    this._spawntime, 
                    -this._width,
                    this._obstacleHitboxH,
                    this._obstacleHitboxW,
                    2,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,0,255,0.5)"
                ),
                [
                    new BackgroundSprite("./dist/resurses/1.png",this._startPossitionY, -this._gamespeed/4),
                    new BackgroundSprite("./dist/resurses/2.png",this._startPossitionY,-this._gamespeed/6),
                    new BackgroundSprite("./dist/resurses/3.png",this._startPossitionY,-this._gamespeed/8),
                    new BackgroundSprite("./dist/resurses/4.png",this._startPossitionY,0)
                ]
            )
        )
        this._levels.change("stage1")
    }

    update(dt: number): void {
        if(keys.wasPressed("Escape")){
            this._pause = !this._pause 
        }
        if(keys.wasPressed("Enter")){
            this._states.change("play")
        }

        if(!this._pause){
            if((<Level>this._levels.current).isEnd()){
                this._levels.change("stage2")
            }
            this._levels.update(dt)
            //this._gamespeed *= 1.00005
            this._floor.update(dt)
            this._player.update(dt)

            if(this._player.collides(this._floor) || this._player.y < 0){
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight)
            }
            
            //
            if((<Level>this._levels.current).obstacles.collide(this._player) && !this._player.isInvincible && --this._lifesCounter < 0){
                this._states.change("lose", this._coinCounter)
            }
            
            //
            if((<Level>this._levels.current).coins.collide(this._player)){
                this._coinCounter++
            }

            let i: number
            for(i = 0; i < (<Level>this._levels.current).background.length; i++){
                (<Level>this._levels.current).background[i].update(dt)
            }
        }
    }

    draw(): void {
        this._levels.draw()
        this._floor.draw()
        this._player.draw()

        render.drawMiddleText("Жизни: " + this._lifesCounter, 0, this._height - 180)
        render.drawMiddleText("Монет: " + this._coinCounter, 0, this._height - 200)
    }
}