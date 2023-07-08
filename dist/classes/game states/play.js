import { keys, render } from "../../engine.js";
import { Floor } from "../game objects/floor.js";
import { FlyingObjects } from "../game objects/flying objects.js";
import { Player } from "../game objects/player.js";
import { State } from "../state machine/state.js";
import { StateMachine } from "../state machine/machine.js";
import { BackgroundScrollingLayer } from "../game objects/background layer.js";
import { Level } from "../level states/level.js";
export class PlayState extends State {
    //Типа константы
    _gravity = -3000;
    _gamespeed = 500;
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
    _asd = true;
    //Очки
    _coinCounter;
    _lifesCounter;
    constructor(states) {
        super(states);
    }
    enter() {
        this._pause = false;
        this._player = new Player(this._startPossitionX, this._startPossitionY, this._gravity, this._jumpHight, this._playerHitboxH, this._playerHitboxW, "rgba(255,0,0,0.5)");
        this._floor = new Floor(this._startPossitionY, "rgba(255,255,0,0.5)");
        this._coinCounter = 0;
        this._lifesCounter = 3;
        this._levels = new StateMachine();
        this._levels.add("stage1", new Level(this._levels, 3, new FlyingObjects(this._spawntime * 2, -this._width, this._obstacleHitboxH * 1.2, this._obstacleHitboxW, 3, this._startPossitionY, this._player.hitboxHeight, "rgba(0,255,120,0.5)"), new FlyingObjects(this._spawntime, -this._width, this._obstacleHitboxH, this._obstacleHitboxW, 2, this._startPossitionY, this._player.hitboxHeight, "rgba(0,0,255,0.5)"), [
            new BackgroundScrollingLayer("./dist/resurses/1.png", this._startPossitionY, -this._gamespeed / 4),
            new BackgroundScrollingLayer("./dist/resurses/empty.png", this._startPossitionY, -this._gamespeed / 6),
            new BackgroundScrollingLayer("./dist/resurses/empty.png", this._startPossitionY, -this._gamespeed / 8),
            new BackgroundScrollingLayer("./dist/resurses/4.png", this._startPossitionY, 0)
        ]));
        this._levels.add("stage2", new Level(this._levels, 8, new FlyingObjects(this._spawntime * 2, -this._width, this._obstacleHitboxH * 1.2, this._obstacleHitboxW, 3, this._startPossitionY, this._player.hitboxHeight, "rgba(0,255,120,0.5)"), new FlyingObjects(this._spawntime, -this._width, this._obstacleHitboxH, this._obstacleHitboxW, 2, this._startPossitionY, this._player.hitboxHeight, "rgba(0,0,255,0.5)"), [
            new BackgroundScrollingLayer("./dist/resurses/1.png", this._startPossitionY, -this._gamespeed / 4),
            new BackgroundScrollingLayer("./dist/resurses/2.png", this._startPossitionY, -this._gamespeed / 6),
            new BackgroundScrollingLayer("./dist/resurses/empty.png", this._startPossitionY, -this._gamespeed / 8),
            new BackgroundScrollingLayer("./dist/resurses/4.png", this._startPossitionY, 0)
        ]));
        this._levels.add("stage3", new Level(this._levels, 10000000, new FlyingObjects(this._spawntime * 2, -this._width, this._obstacleHitboxH * 1.2, this._obstacleHitboxW, 3, this._startPossitionY, this._player.hitboxHeight, "rgba(0,255,120,0.5)"), new FlyingObjects(this._spawntime, -this._width, this._obstacleHitboxH, this._obstacleHitboxW, 2, this._startPossitionY, this._player.hitboxHeight, "rgba(0,0,255,0.5)"), [
            new BackgroundScrollingLayer("./dist/resurses/1.png", this._startPossitionY, -this._gamespeed / 4),
            new BackgroundScrollingLayer("./dist/resurses/2.png", this._startPossitionY, -this._gamespeed / 6),
            new BackgroundScrollingLayer("./dist/resurses/3.png", this._startPossitionY, -this._gamespeed / 8),
            new BackgroundScrollingLayer("./dist/resurses/4.png", this._startPossitionY, 0)
        ]));
        this._levels.change("stage1");
    }
    update(dt) {
        if (keys.wasPressed("Escape")) {
            this._pause = !this._pause;
        }
        if (keys.wasPressed("Enter")) {
            this._states.change("play");
        }
        if (!this._pause) {
            if (this._levels.current.isEnd() && this._asd) {
                this._levels.change("stage2", this._levels.current);
                this._asd = false;
            }
            if (this._levels.current.isEnd() && !this._asd) {
                this._levels.change("stage3", this._levels.current);
            }
            this._levels.update(dt);
            //this._gamespeed *= 1.00005
            this._floor.update(dt);
            this._player.update(dt);
            if (this._player.collides(this._floor) || this._player.y < 0) {
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight);
            }
            //
            if (this._levels.current.obstacles.collide(this._player) && !this._player.isInvincible && --this._lifesCounter < 0) {
                this._states.change("lose", this._coinCounter);
            }
            //
            if (this._levels.current.coins.collide(this._player)) {
                this._coinCounter++;
            }
            let i;
            for (i = 0; i < this._levels.current.background.length; i++) {
                this._levels.current.background[i].update(dt);
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
