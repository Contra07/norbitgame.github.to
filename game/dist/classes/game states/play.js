import { keys, render, resourses } from "../../engine.js";
import { Floor } from "../scene/floor.js";
import { FlyingObjects } from "../scene/flying objects/flying objects.js";
import { Player } from "../scene/player.js";
import { GameState } from "../state machine/game state.js";
import { BackgroundLayer } from "../scene/background layer.js";
import { Level } from "../level states/level.js";
import { LevelMachine } from "../level states/level machine.js";
import { DOManager } from "../managers/dom.js";
import { CycleSprite } from "../core/cycle sprite.js";
import { Coin } from "../scene/flying objects/coin.js";
import { Banana } from "../scene/flying objects/banana.js";
import { Garbage } from "../scene/flying objects/garbage.js";
import { Pigeon } from "../scene/flying objects/pigeon.js";
import { Bench } from "../scene/flying objects/bench.js";
export class PlayState extends GameState {
    //Типа константы
    _gravity = -3000;
    _gamespeed = 600;
    _height = render.VIRTUAL_HEIGHT;
    _width = render.VIRTUAL_WIDTH;
    _pause = false;
    _targetFPS = 60;
    //Игрок
    _startPossitionX = this._width * 0.15;
    _startPossitionY = this._height * 0.05;
    _playerHitboxH = this._height * 0.15;
    _playerHitboxW = this._width * 0.08;
    _jumpHight = 150;
    //Препятствия
    _obstacleHitboxH = this._height * 0.05;
    _obstacleHitboxW = this._width * 0.05;
    _spawntime = 2;
    //Сущности
    _floor;
    _player;
    //Уровни 
    _levels;
    //Очки
    _coinCounter;
    _lifesCounter;
    //Меню
    play;
    constructor(states) {
        super(states);
        this.play = document.getElementById('play');
    }
    pause() {
        this._pause = true;
    }
    resume() {
        this._pause = false;
    }
    exit() {
        DOManager.hide(this.play);
    }
    enter() {
        //Типа константы
        let gamespeed = 600;
        let height = render.VIRTUAL_HEIGHT;
        let width = render.VIRTUAL_WIDTH;
        let targetFPS = 60;
        //Счет и пауза
        let pause = false;
        let coinCounter = 0;
        let lifesCounter = 3;
        //Игрок
        let gravity = -2500;
        let playerStartPossitionX = this._width * 0.15;
        let playerStartPossitionY = resourses.getSprite("floor").height - 3;
        let playerHitboxH = this._height * 0.15;
        let playerHitboxW = this._width * 0.08;
        let playerHitboxColor = "rgba(255,0,0,0.5)";
        let playerJumpHight = 150;
        let playerJumpSpite = resourses.getSprite("player jump");
        let playerAnim = new CycleSprite([
            resourses.getSprite("player run 1"),
            resourses.getSprite("player run 2"),
            resourses.getSprite("player run 3"),
            resourses.getSprite("player run 2"),
        ], 0.2);
        //Пол 
        let floorHeight = playerStartPossitionY;
        let floorColor = "rgba(255,255,0,0.5)";
        //Сущности
        //Монета
        let coinWidth = resourses.getSprite("coin1").width;
        let coinHeight = resourses.getSprite("coin1").height;
        let coinSpeed = -this._gamespeed * 0.5;
        let coinMinY = floorHeight + coinHeight;
        let coinMaxY = playerHitboxH * 2;
        let coinAnimation = new CycleSprite([
            resourses.getSprite("coin1"),
            resourses.getSprite("coin2"),
            resourses.getSprite("coin3"),
            resourses.getSprite("coin4"),
        ], 0.35);
        let coin = new Coin(coinWidth, coinHeight, coinSpeed, coinMinY, coinMaxY, undefined, undefined, coinAnimation);
        //Банан
        let bananaY = floorHeight;
        let bananaWidth = resourses.getSprite("banana").width;
        let bananaHeight = resourses.getSprite("banana").height;
        let bananaSpeed = -this._gamespeed * 0.5;
        let bananaSprite = resourses.getSprite("banana");
        let banana = new Banana(bananaY, bananaWidth, bananaHeight, bananaSpeed, undefined, bananaSprite);
        //Мусор
        let garbageY = floorHeight;
        let garbageWidth = resourses.getSprite("garbage").width;
        let garbageHeight = resourses.getSprite("garbage").height;
        let garbageSpeed = -this._gamespeed * 0.5;
        let garbageSprite = resourses.getSprite("garbage");
        let garbage = new Garbage(garbageY, garbageHeight, garbageWidth, garbageSpeed, undefined, garbageSprite);
        //Голубь
        let pigeonWidth = resourses.getSprite("pigeon").width;
        let pigeonHeight = resourses.getSprite("pigeon").height;
        let pigeonSpeed = -this._gamespeed * 0.7;
        let pigeonMinY = floorHeight + playerHitboxH + pigeonHeight;
        let pigeonMaxY = playerHitboxH * 2;
        let pigeonAnimation = new CycleSprite([
            resourses.getSprite("pigeon"),
        ], 0.2);
        let pigeon = new Pigeon(pigeonWidth, pigeonHeight, pigeonSpeed, pigeonMinY, pigeonMaxY, undefined, undefined, pigeonAnimation);
        //Скамейка
        let benchY = floorHeight;
        let benchWidth = resourses.getSprite("bench").width;
        let benchHeight = resourses.getSprite("bench").height;
        let benchSpeed = -this._gamespeed * 0.5;
        let benchSprite = resourses.getSprite("bench");
        let bench = new Bench(benchY, benchHeight, benchWidth, benchSpeed, undefined, benchSprite);
        //Уровень 1
        let level1Time = 120;
        let level1CoinTime = 4;
        let level1EnemyTime = 2;
        let level1Speed = gamespeed * 0.5;
        let level1Coins = [coin];
        let level1Enemies = [banana, garbage, pigeon, bench];
        let level1Background = [
            new BackgroundLayer(resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -level1Speed * 0.05),
            new BackgroundLayer(resourses.getSprite("floor"), 0, 0, -gamespeed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer1"), 0, floorHeight, -level1Speed * 0.5, level1Time, [
                resourses.getSprite("school1"),
                resourses.getSprite("school2"),
                resourses.getSprite("school3"),
            ]),
            new BackgroundLayer(resourses.getSprite("bglayer2"), 0, floorHeight, -level1Speed * 0.2, level1Time, [
                resourses.getSprite("university1"),
                resourses.getSprite("university2"),
                resourses.getSprite("university3"),
            ]),
            new BackgroundLayer(resourses.getSprite("bglayer3"), 0, floorHeight, -level1Speed * 0.1, level1Time, [
                resourses.getSprite("work1"),
                resourses.getSprite("work2"),
                resourses.getSprite("work3"),
            ]),
            new BackgroundLayer(resourses.getSprite("norbit_far1"), render.VIRTUAL_WIDTH * 0.6, floorHeight, -level1Speed / 300),
            new BackgroundLayer(resourses.getSprite("bglayer4"), 0, floorHeight, 0)
        ];
        //----------
        this._pause = pause;
        this._coinCounter = coinCounter;
        this._lifesCounter = lifesCounter;
        this._player = new Player(playerStartPossitionX, playerStartPossitionY, gravity, playerJumpHight, playerHitboxH, playerHitboxW, playerHitboxColor, playerJumpSpite, playerAnim);
        this._floor = new Floor(floorHeight, floorColor);
        this._levels = new LevelMachine();
        this._levels.add(new Level(this._levels, level1Time, gamespeed, new FlyingObjects(level1Coins, true, level1CoinTime), new FlyingObjects(level1Enemies, true, level1EnemyTime), level1Background));
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
        DOManager.show(this.play);
    }
    update(dt) {
        if (keys.wasPressed("Escape")) {
            this._pause = !this._pause;
        }
        if (keys.wasPressed("Enter")) {
            this._states.change("play");
        }
        if (!this._pause) {
            //Перелючение уровня
            if (this._levels.current.isEndEnd) {
                if (this._levels.isLastLevel) {
                    this._states.change("end", { coins: this._coinCounter, win: false });
                }
                else {
                    //this.pause()
                    this._levels.next();
                }
            }
            //Обновление сущностей
            this._levels.update(dt);
            //this._floor.update(dt)
            this._player.update(dt);
            for (let object of this._levels.current.obstacles.objects) {
                if (object.sprite == resourses.getSprite("bench")) {
                    if (!object.canRun) {
                        object.canRunOnTop(this._player);
                    }
                    else {
                        if (this._player.collides(object)) {
                            this._player.onFloor(object.y + object.hitboxHeight + 1);
                        }
                        else {
                            this._player.d2y = this._gravity;
                        }
                    }
                }
            }
            //Столкновение с полом
            if (this._player.collides(this._floor) || this._player.y < 0) {
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight);
            }
            //Столкновение с препятствиями
            if (this._levels.current.obstacles.collide(this._player) && !this._player.isInvincible && --this._lifesCounter <= 0) {
                this._states.change("end", { coins: this._coinCounter, win: true });
            }
            //Собирание монет
            if (this._levels.current.coins.collide(this._player)) {
                this._coinCounter++;
            }
        }
    }
    draw() {
        this._levels.draw();
        this._floor.draw();
        this._player.draw();
        render.drawMiddleText("Жизни: " + this._lifesCounter, 0, this._height - 180);
        render.drawMiddleText("Монет: " + this._coinCounter, 0, this._height - 200);
    }
}