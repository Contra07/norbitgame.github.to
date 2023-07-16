import { keys, render, resourses } from "../../engine.js"
import { Floor } from "../scene/floor.js"
import { FlyingObjects } from "../scene/flying objects.js"
import { Player } from "../scene/player.js"
import { GameState } from "../state machine/game state.js"
import { StateMachine } from "../state machine/game machine.js"
import { BackgroundLayer} from "../scene/background layer.js"
import { Level } from "../level states/level.js"
import { LevelMachine } from "../level states/level machine.js"
import { DOManager } from "../managers/dom.js"

export class PlayState extends GameState{

    //Типа константы
    private _gravity:number = -3000
    private _gamespeed: number = 600
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
    private _levels!: LevelMachine

    //Очки
    private _coinCounter!: number
    private _lifesCounter!: number

    //Меню
    private play: HTMLElement


    constructor(states: StateMachine){
        super(states)
        this.play = <HTMLElement>document.getElementById('play')
    }

    
    private pause(): void{
        this._pause = true
    }

    private resume(): void{
        this._pause = false
    }

    public exit(): void {
        DOManager.hide(this.play)
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
            "rgba(255,0,0,0.5)",
            resourses.getSprite("player jump"),
            0.2,
            [
                resourses.getSprite("player run 1"),
                resourses.getSprite("player run 2"),
                resourses.getSprite("player run 3"),
                resourses.getSprite("player run 2"),
            ]
            )

        this._floor = new Floor(
            this._startPossitionY,
            "rgba(255,255,0,0.5)"
        )

        this._coinCounter = 0
        this._lifesCounter = 3

        this._levels = new LevelMachine()
        this._levels.add(
            new Level(
                this._levels,
                5,
                this._gamespeed,
                new FlyingObjects(
                    false,
                    this._spawntime*2, 
                    -this._gamespeed*0.8,
                    this._obstacleHitboxH*1.5,
                    this._obstacleHitboxW*1.5,
                    3,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,255,120,0.5)",
                    resourses.getSprite("coin")
                ),
                new FlyingObjects(
                    false,
                    this._spawntime, 
                    -this._gamespeed*0.8,
                    this._obstacleHitboxH,
                    this._obstacleHitboxW,
                    2,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,0,255,0.5)",
                    resourses.getSprite("enemy")
                ),
                [
                    new BackgroundLayer(resourses.getSprite("clouds"),0,render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -this._gamespeed/32),
                    new BackgroundLayer(resourses.getSprite("floor"),0,0, -this._gamespeed/2),
                    new BackgroundLayer(resourses.getSprite("bglayer1"),0,this._startPossitionY, -this._gamespeed/4),
                    new BackgroundLayer(resourses.getSprite("empty"),0,this._startPossitionY,-this._gamespeed/6),
                    new BackgroundLayer(resourses.getSprite("empty"),0,this._startPossitionY,-this._gamespeed/8),
                    new BackgroundLayer(resourses.getSprite("bglayer4"),0,this._startPossitionY,0)
                ]
            )
        )
        this._levels.add(
            new Level(
                this._levels,
                5,
                this._gamespeed,
                new FlyingObjects(
                    false,
                    this._spawntime*2, 
                    -this._gamespeed*0.8,
                    this._obstacleHitboxH*1.5,
                    this._obstacleHitboxW*1.5,
                    3,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,255,120,0.5)",
                    resourses.getSprite("coin")
                ),
                new FlyingObjects(
                    false,
                    this._spawntime, 
                    -this._gamespeed*0.8,
                    this._obstacleHitboxH*1.4,
                    this._obstacleHitboxW/1.4,
                    2,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,0,255,0.5)",
                    resourses.getSprite("enemy")
                ),
                [
                    new BackgroundLayer(resourses.getSprite("clouds"),0,render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -1.2*this._gamespeed/32),
                    new BackgroundLayer(resourses.getSprite("floor"),0,0, -1.2*this._gamespeed/2),
                    new BackgroundLayer(resourses.getSprite("bglayer1"),0,this._startPossitionY, -1.2*this._gamespeed/4),
                    new BackgroundLayer(resourses.getSprite("bglayer2"),0,this._startPossitionY,-1.2*this._gamespeed/6),
                    new BackgroundLayer(resourses.getSprite("empty"),0,this._startPossitionY,-1.2*this._gamespeed/8),
                    new BackgroundLayer(resourses.getSprite("bglayer4"),0,this._startPossitionY,0)
                ]
            )
        )
        this._levels.add(
            new Level(
                this._levels,
                25,
                this._gamespeed,
                new FlyingObjects(
                    false,
                    this._spawntime*2, 
                    -this._gamespeed*0.8,
                    this._obstacleHitboxH*1.5,
                    this._obstacleHitboxW*1.5,
                    3,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,255,120,0.5)",
                    resourses.getSprite("coin")
                ),
                new FlyingObjects(
                    false,
                    this._spawntime, 
                    -this._gamespeed*0.8,
                    this._obstacleHitboxH/1.4,
                    this._obstacleHitboxW*1.4,
                    2,
                    this._startPossitionY,
                    this._player.hitboxHeight,
                    "rgba(0,0,255,0.5)",
                    resourses.getSprite("enemy")
                ),
                [
                    new BackgroundLayer(resourses.getSprite("clouds"),0,render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -1.4*this._gamespeed/32),
                    new BackgroundLayer(resourses.getSprite("floor"),0,0, -1.4*this._gamespeed/2),
                    new BackgroundLayer(resourses.getSprite("bglayer1"),0,this._startPossitionY, -1.4*this._gamespeed/4),
                    new BackgroundLayer(resourses.getSprite("bglayer2"),0,this._startPossitionY,-1.4*this._gamespeed/6),
                    new BackgroundLayer(resourses.getSprite("bglayer3"),0,this._startPossitionY,-1.4*this._gamespeed/8),
                    new BackgroundLayer(resourses.getSprite("bglayer4"),0,this._startPossitionY,0)
                ]
            )
        )
        DOManager.show(this.play)
    }

    update(dt: number): void {

        if(keys.wasPressed("Escape")){
            this._pause = !this._pause 
        }
        if(keys.wasPressed("Enter")){
            this._states.change("play")
        }

        if(!this._pause){

            //Перелючение уровня
            if(this._levels.current.isEndEnd){
                if(this._levels.isLastLevel){
                    this._states.change("end", {coins: this._coinCounter, win: false})
                }
                else{
                    //this.pause()

                    this._levels.next()
                }
            }

            //Обновление сущностей
            this._levels.update(dt)
            this._floor.update(dt)
            this._player.update(dt)

            //Столкновение с полом
            if(this._player.collides(this._floor) || this._player.y < 0){
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight)
            }
            
            //Столкновение с препятствиями
            if((<Level>this._levels.current).obstacles.collide(this._player) && !this._player.isInvincible && --this._lifesCounter <= 0){
                this._states.change("end", {coins: this._coinCounter, win: true})
            }
            
            //Собирание монет
            if((<Level>this._levels.current).coins.collide(this._player)){
                this._coinCounter++
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