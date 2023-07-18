import { keys, render, resourses } from "../../engine.js"
import { Floor } from "../scene/floor.js"
import { FlyingObjects } from "../scene/flying objects/flying objects.js"
import { Player } from "../scene/player.js"
import { GameState } from "../state machine/game state.js"
import { StateMachine } from "../state machine/game machine.js"
import { BackgroundLayer} from "../scene/background layer.js"
import { Level } from "../level states/level.js"
import { LevelMachine } from "../level states/level machine.js"
import { DOManager } from "../managers/dom.js"
import { CycleSprite } from "../core/cycle sprite.js"
import { FlyingObject } from "../scene/flying objects/flying object.js"
import { Coin } from "../scene/flying objects/coin.js"
import { Banana } from "../scene/flying objects/banana.js"
import { Garbage } from "../scene/flying objects/garbage.js"
import { Pigeon } from "../scene/flying objects/pigeon.js"
import { Bench } from "../scene/flying objects/bench.js"

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
        //Типа константы
        let gravity:number = -3000
        let gamespeed: number = 600
        let height: number = render.VIRTUAL_HEIGHT
        let width: number = render.VIRTUAL_WIDTH
        let targetFPS: number = 60

        //Счет и пауза
        let pause = false
        let coinCounter = 0
        let lifesCounter = 3

        //Игрок
        let playerStartPossitionX = this._width*0.15
        let playerStartPossitionY = this._height*0.05
        let playerHitboxH = this._height*0.15
        let playerHitboxW = this._width*0.08
        let playerHitboxColor = "rgba(255,0,0,0.5)"
        let playerJumpHight = 150
        let playerJumpSpite = resourses.getSprite("player jump")
        let playerAnim = new CycleSprite(
            [
                resourses.getSprite("player run 1"),
                resourses.getSprite("player run 2"),
                resourses.getSprite("player run 3"),
                resourses.getSprite("player run 2"),
            ],
            0.2
        )

        //Пол 
        let floorHeight = playerStartPossitionY
        let floorColor = "rgba(255,255,0,0.5)"

        //Сущности
        
        //Монета
        let coinWidth = resourses.getSprite("coin1").width
        let coinHeight = resourses.getSprite("coin1").height
        let coinSpeed = -this._gamespeed*0.5
        let coinMinY = floorHeight + coinHeight
        let coinMaxY = playerHitboxH*2
        let coinAnimation = new CycleSprite(
            [
                resourses.getSprite("coin1"),
                resourses.getSprite("coin2"),
                resourses.getSprite("coin3"),
                resourses.getSprite("coin4"),
            ],
            0.35
        )
        let coin = new Coin(
            coinWidth,
            coinHeight,
            coinSpeed,
            coinMinY,
            coinMaxY,
            undefined,
            undefined,
            coinAnimation
        )

        //Банан
        let bananaY = floorHeight
        let bananaWidth = resourses.getSprite("banana").width
        let bananaHeight = resourses.getSprite("banana").height
        let bananaSpeed = -this._gamespeed*0.5
        let bananaSprite = resourses.getSprite("banana")
        let banana = new Banana(
            bananaY,
            bananaWidth,
            bananaHeight,
            bananaSpeed,
            undefined,
            bananaSprite
        )

        //Мусор
        let garbageY = floorHeight
        let garbageWidth = resourses.getSprite("garbage").width
        let garbageHeight = resourses.getSprite("garbage").height
        let garbageSpeed = -this._gamespeed*0.5
        let garbageSprite = resourses.getSprite("garbage")
        let garbage = new Garbage(
            garbageY,
            garbageHeight,
            garbageWidth,
            garbageSpeed,
            undefined,
            garbageSprite
        )

        //Голубь
        let pigeonWidth = resourses.getSprite("pigeon").width
        let pigeonHeight = resourses.getSprite("pigeon").height
        let pigeonSpeed = -this._gamespeed*0.7
        let pigeonMinY = floorHeight + playerHitboxH
        let pigeonMaxY = playerHitboxH*2
        let pigeonAnimation = new CycleSprite(
            [
                resourses.getSprite("pigeon"),
            ],
            0.2
        )
        let pigeon = new Pigeon(
            pigeonWidth,
            pigeonHeight,
            pigeonSpeed,
            pigeonMinY,
            pigeonMaxY,
            undefined,
            undefined,
            pigeonAnimation
        )

        //Скамейка
        let benchY = floorHeight
        let benchWidth = resourses.getSprite("bench").width
        let benchHeight = resourses.getSprite("bench").height
        let benchSpeed = -this._gamespeed*0.5
        let benchSprite = resourses.getSprite("bench")
        let bench = new Bench(
            benchY,
            benchHeight,
            benchWidth,
            benchSpeed,
            undefined,
            benchSprite
        )

        //Уровень 1
        let level1Time = 30
        let level1CoinTime = 4
        let level1EnemyTime = 2
        let level1Speed = gamespeed
        let level1Coins = [coin]
        let level1Enemies = [banana, garbage, pigeon, bench]
        let level1Background = [
            new BackgroundLayer(resourses.getSprite("clouds"),render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -level1Speed/32),
            new BackgroundLayer(resourses.getSprite("floor"),0, -level1Speed/2),
            new BackgroundLayer(resourses.getSprite("bglayer1"),floorHeight, -level1Speed/4),
            new BackgroundLayer(resourses.getSprite("empty"),floorHeight,-level1Speed/6),
            new BackgroundLayer(resourses.getSprite("empty"),floorHeight,-level1Speed/8),
            new BackgroundLayer(resourses.getSprite("bglayer4"),floorHeight,0)
        ]
        /*
        level1Coins.forEach(
            value => {
                value.dx = -level1Speed/2
            }
        )
        level1Enemies.forEach(
            value => {
                value.dx = -level1Speed/2
            }
        )
        */

        //----------
        this._pause = pause
        this._coinCounter = coinCounter
        this._lifesCounter = lifesCounter

        this._player = new Player(
            playerStartPossitionX,
            playerStartPossitionY,
            gravity,
            playerJumpHight,
            playerHitboxH,
            playerHitboxW,
            playerHitboxColor,
            playerJumpSpite,
            playerAnim
        )
        this._floor = new Floor(
            floorHeight,
            floorColor
        )

        this._levels = new LevelMachine()
        this._levels.add(new Level( 
            this._levels, 
            level1Time, 
            gamespeed, 
            new FlyingObjects(
                level1Coins,
                true,
                level1CoinTime
            ), 
            new FlyingObjects(
                level1Enemies,
                true,
                level1EnemyTime
            ),
            level1Background 
        ))
        /*
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
                    this._player.hitboxHeight*2,
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
                    this._player.hitboxHeight*2,
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
        */
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
            //this._floor.update(dt)
            this._player.update(dt)

            for(let object of this._levels.current.obstacles.objects){
                if(object.sprite == resourses.getSprite("bench")){
                    if(!(object as Bench).canRun){
                        (object as Bench).canRunOnTop(this._player)
                    }
                    else{
                        if(this._player.collides(object)){
                            this._player.onFloor(object.y+object.hitboxHeight+1)
                        }
                        else{
                            this._player.d2y = this._gravity
                        }
                    }  
                }
            }
            
            //Столкновение с полом
            if(this._player.collides(this._floor) || this._player.y < 0){
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight)
            }

            //Столкновение с препятствиями
            if(this._levels.current.obstacles.collide(this._player) && !this._player.isInvincible && --this._lifesCounter <= 0){
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