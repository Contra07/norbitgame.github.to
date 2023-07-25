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
        let totalTime = 120;
        let norbitSpeed = -(render.VIRTUAL_WIDTH + 150) / totalTime;
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
        let pigeonWidth = resourses.getSprite("pigeon1").width;
        let pigeonHeight = resourses.getSprite("pigeon1").height;
        let pigeonSpeed = -this._gamespeed * 0.7;
        let pigeonMinY = floorHeight + playerHitboxH + pigeonHeight;
        let pigeonMaxY = playerHitboxH * 4;
        let pigeonAnimation = new CycleSprite([
            resourses.getSprite("pigeon1"),
            resourses.getSprite("pigeon2")
        ], 0.2);
        let pigeon = new Pigeon(pigeonWidth, pigeonHeight, pigeonSpeed, pigeonMinY, pigeonMaxY, undefined, undefined, pigeonAnimation);
        //Скамейка
        let benchY = floorHeight;
        let benchWidth = resourses.getSprite("car").width;
        let benchHeight = resourses.getSprite("car").height;
        let benchSpeed = -this._gamespeed * 0.5;
        let benchSprite = resourses.getSprite("car");
        let bench = new Bench(benchY, benchHeight, benchWidth, benchSpeed, undefined, benchSprite);
        //Уровень 1
        let level1Time = totalTime / 4;
        let level1CoinTime = 6;
        let level1EnemyTime = 5;
        let level1Speed = gamespeed * 0.25;
        let level1Coins = [coin.clone()];
        let level1Enemies = [banana.clone(), garbage.clone()];
        let level1Background = [
            new BackgroundLayer(resourses.getSprite("floor"), resourses.getSprite("floor"), 0, 0, -gamespeed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer1"), resourses.getSprite("bglayer1begin"), 0, floorHeight, -level1Speed * 0.5),
            new BackgroundLayer(resourses.getSprite("empty"), resourses.getSprite("empty"), 0, floorHeight, -level1Speed * 0.2),
            new BackgroundLayer(resourses.getSprite("empty"), resourses.getSprite("empty"), 0, floorHeight, -level1Speed * 0.1),
            new BackgroundLayer(resourses.getSprite("bglayer4"), resourses.getSprite("bglayer4"), -150, floorHeight, norbitSpeed),
            new BackgroundLayer(resourses.getSprite("clouds"), resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height + 100, -level1Speed * 0.05),
            new BackgroundLayer(resourses.getSprite("bglayer5"), resourses.getSprite("bglayer5"), 0, floorHeight, 0)
        ];
        //Уровень 2
        let level2Time = totalTime / 4;
        let level2CoinTime = 6;
        let level2EnemyTime = 3.5;
        let level2Speed = gamespeed * 0.35;
        let level2Coins = [coin.clone()];
        let level2Enemies = [banana.clone(), garbage.clone(), pigeon.clone()];
        let level2Background = [
            new BackgroundLayer(resourses.getSprite("floor"), resourses.getSprite("floor"), 0, 0, -gamespeed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer1"), resourses.getSprite("bglayer1"), 0, floorHeight, -level2Speed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer2"), resourses.getSprite("bglayer2begin"), 0, floorHeight, -level2Speed * 0.2),
            new BackgroundLayer(resourses.getSprite("empty"), resourses.getSprite("empty"), 0, floorHeight, -level2Speed * 0.1),
            new BackgroundLayer(resourses.getSprite("bglayer4"), resourses.getSprite("bglayer4"), -150, floorHeight, norbitSpeed),
            new BackgroundLayer(resourses.getSprite("clouds"), resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height + 100, -level2Speed * 0.05),
            new BackgroundLayer(resourses.getSprite("bglayer5"), resourses.getSprite("bglayer5"), 0, floorHeight, 0)
        ];
        //Уровень 3
        let level3Time = totalTime / 2;
        let level3CoinTime = 6;
        let level3EnemyTime = 2.3;
        let level3Speed = gamespeed * 0.45;
        let level3Coins = [coin.clone()];
        let level3Enemies = [banana.clone(), garbage.clone(), pigeon.clone(), bench.clone()];
        let level3Background = [
            new BackgroundLayer(resourses.getSprite("floor"), resourses.getSprite("floor"), 0, 0, -gamespeed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer1"), resourses.getSprite("bglayer1"), 0, floorHeight, -level3Speed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer2"), resourses.getSprite("bglayer2"), 0, floorHeight, -level3Speed * 0.2),
            new BackgroundLayer(resourses.getSprite("bglayer3"), resourses.getSprite("bglayer3begin"), 0, floorHeight, -level3Speed * 0.1),
            new BackgroundLayer(resourses.getSprite("bglayer4"), resourses.getSprite("bglayer4"), -150, floorHeight, norbitSpeed),
            new BackgroundLayer(resourses.getSprite("clouds"), resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height + 100, -level3Speed * 0.05),
            new BackgroundLayer(resourses.getSprite("bglayer5"), resourses.getSprite("bglayer5"), 0, floorHeight, 0)
        ];
        //Уровень Финал
        let levelfinalTime = (render.VIRTUAL_WIDTH + level3Background[0].x - playerStartPossitionX + render.VIRTUAL_WIDTH + 475 - playerHitboxW + 85) / (gamespeed * 0.5) - render.VIRTUAL_WIDTH / gamespeed - render.VIRTUAL_WIDTH / gamespeed;
        let levelfinalCoinTime = 0;
        let levelfinalEnemyTime = 0;
        let levelfinalSpeed = level3Speed;
        let levelfinalCoins = [];
        let levelfinalEnemies = [];
        let levelfinalBackground = [
            new BackgroundLayer(resourses.getSprite("floor"), resourses.getSprite("norbitclose"), 0, 0, -gamespeed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer1"), resourses.getSprite("bglayer1"), 0, floorHeight, -levelfinalSpeed * 0.5),
            new BackgroundLayer(resourses.getSprite("bglayer2"), resourses.getSprite("bglayer2"), 0, floorHeight, -levelfinalSpeed * 0.2),
            new BackgroundLayer(resourses.getSprite("bglayer3"), resourses.getSprite("bglayer3begin"), 0, floorHeight, -levelfinalSpeed * 0.1),
            new BackgroundLayer(resourses.getSprite("bglayer4"), resourses.getSprite("bglayer4"), -150, floorHeight, norbitSpeed),
            new BackgroundLayer(resourses.getSprite("clouds"), resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height + 100, -levelfinalSpeed * 0.05),
            new BackgroundLayer(resourses.getSprite("bglayer5"), resourses.getSprite("bglayer5"), 0, floorHeight, 0)
        ];
        //----------
        this._pause = pause;
        this._coinCounter = coinCounter;
        this._lifesCounter = lifesCounter;
        this._player = new Player(playerStartPossitionX, playerStartPossitionY, gravity, playerJumpHight, playerHitboxH, playerHitboxW, playerHitboxColor, playerJumpSpite, playerAnim);
        this._floor = new Floor(floorHeight, floorColor);
        this._levels = new LevelMachine();
        this._levels.add(new Level(this._levels, level1Time, gamespeed, new FlyingObjects(level1Coins, true, level1CoinTime), new FlyingObjects(level1Enemies, true, level1EnemyTime), level1Background));
        this._levels.add(new Level(this._levels, level2Time, gamespeed, new FlyingObjects(level2Coins, true, level2CoinTime), new FlyingObjects(level2Enemies, true, level2EnemyTime), level2Background));
        this._levels.add(new Level(this._levels, level3Time, gamespeed, new FlyingObjects(level3Coins, true, level3CoinTime), new FlyingObjects(level3Enemies, true, level3EnemyTime), level3Background));
        this._levels.add(new Level(this._levels, levelfinalTime, gamespeed, new FlyingObjects(levelfinalCoins, true, levelfinalCoinTime), new FlyingObjects(levelfinalEnemies, true, levelfinalEnemyTime), levelfinalBackground));
        DOManager.show(this.play);
        document.getElementsByTagName('body')[0].className = 'playbody';
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
                    this._levels.next();
                }
            }
            //Обновление сущностей
            this._levels.update(dt);
            this._player.update(dt);
            //Лавки
            for (let object of this._levels.current.obstacles.objects) {
                if (object.sprite == resourses.getSprite("car")) {
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
