import { keys, render, resourses } from "../../engine.js";
import { Floor } from "../scene/floor.js";
import { FlyingObjects } from "../scene/flying objects.js";
import { Player } from "../scene/player.js";
import { GameState } from "../state machine/game state.js";
import { BackgroundLayer } from "../scene/background layer.js";
import { Level } from "../level states/level.js";
import { LevelMachine } from "../level states/level machine.js";
import { DOManager } from "../managers/dom.js";
export class PlayState extends GameState {
    //Типа константы
    _gravity = -3000;
    _gamespeed = 800;
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
        this._pause = false;
        this._player = new Player(this._startPossitionX, this._startPossitionY, this._gravity, this._jumpHight, this._playerHitboxH, this._playerHitboxW, "rgba(255,0,0,0.5)", resourses.getSprite("player run 1"));
        this._floor = new Floor(this._startPossitionY, "rgba(255,255,0,0.5)");
        this._coinCounter = 0;
        this._lifesCounter = 3;
        this._levels = new LevelMachine();
        this._levels.add(new Level(this._levels, 5, this._gamespeed, new FlyingObjects(false, this._spawntime * 2, -this._width, this._obstacleHitboxH * 1.2, this._obstacleHitboxW, 3, this._startPossitionY, this._player.hitboxHeight, "rgba(0,255,120,0.5)", resourses.getSprite("coin")), new FlyingObjects(false, this._spawntime, -this._width, this._obstacleHitboxH, this._obstacleHitboxW, 2, this._startPossitionY, this._player.hitboxHeight, "rgba(0,0,255,0.5)"), [
            new BackgroundLayer(resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -this._gamespeed / 32),
            new BackgroundLayer(resourses.getSprite("road"), 0, 0, -this._gamespeed / 2),
            new BackgroundLayer(resourses.getSprite("bglayer1"), 0, this._startPossitionY, -this._gamespeed / 4),
            new BackgroundLayer(resourses.getSprite("empty"), 0, this._startPossitionY, -this._gamespeed / 6),
            new BackgroundLayer(resourses.getSprite("empty"), 0, this._startPossitionY, -this._gamespeed / 8),
            new BackgroundLayer(resourses.getSprite("bglayer4"), 0, this._startPossitionY, 0)
        ]));
        this._levels.add(new Level(this._levels, 5, this._gamespeed, new FlyingObjects(false, this._spawntime * 2, -this._width, this._obstacleHitboxH * 1.2, this._obstacleHitboxW, 3, this._startPossitionY, this._player.hitboxHeight, "rgba(0,255,120,0.5)", resourses.getSprite("coin")), new FlyingObjects(false, this._spawntime, -this._width, this._obstacleHitboxH * 1.4, this._obstacleHitboxW / 1.4, 2, this._startPossitionY, this._player.hitboxHeight, "rgba(0,0,255,0.5)"), [
            new BackgroundLayer(resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -1.2 * this._gamespeed / 32),
            new BackgroundLayer(resourses.getSprite("road"), 0, 0, -1.2 * this._gamespeed / 2),
            new BackgroundLayer(resourses.getSprite("bglayer1"), 0, this._startPossitionY, -1.2 * this._gamespeed / 4),
            new BackgroundLayer(resourses.getSprite("bglayer2"), 0, this._startPossitionY, -1.2 * this._gamespeed / 6),
            new BackgroundLayer(resourses.getSprite("empty"), 0, this._startPossitionY, -1.2 * this._gamespeed / 8),
            new BackgroundLayer(resourses.getSprite("bglayer4"), 0, this._startPossitionY, 0)
        ]));
        this._levels.add(new Level(this._levels, 25, this._gamespeed, new FlyingObjects(false, this._spawntime * 2, -this._width, this._obstacleHitboxH * 1.2, this._obstacleHitboxW, 3, this._startPossitionY, this._player.hitboxHeight, "rgba(0,255,120,0.5)", resourses.getSprite("coin")), new FlyingObjects(false, this._spawntime, -this._width, this._obstacleHitboxH / 1.4, this._obstacleHitboxW * 1.4, 2, this._startPossitionY, this._player.hitboxHeight, "rgba(0,0,255,0.5)"), [
            new BackgroundLayer(resourses.getSprite("clouds"), 0, render.VIRTUAL_HEIGHT - resourses.getSprite("clouds").height, -1.4 * this._gamespeed / 32),
            new BackgroundLayer(resourses.getSprite("road"), 0, 0, -1.4 * this._gamespeed / 2),
            new BackgroundLayer(resourses.getSprite("bglayer1"), 0, this._startPossitionY, -1.4 * this._gamespeed / 4),
            new BackgroundLayer(resourses.getSprite("bglayer2"), 0, this._startPossitionY, -1.4 * this._gamespeed / 6),
            new BackgroundLayer(resourses.getSprite("bglayer3"), 0, this._startPossitionY, -1.4 * this._gamespeed / 8),
            new BackgroundLayer(resourses.getSprite("bglayer4"), 0, this._startPossitionY, 0)
        ]));
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
            this._floor.update(dt);
            this._player.update(dt);
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
