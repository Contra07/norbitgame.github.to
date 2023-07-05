import { keys, render } from "../../../engine.js";
import { Floor } from "../../game objects/floor.js";
import { Obstacles } from "../../game objects/obstacles.js";
import { Player } from "../../game objects/player.js";
import { BaseState } from "./base.js";
import { StateName } from "../names.js";
import { BackgroundImage } from "../../game objects/bgimage.js";
export class PlayState extends BaseState {
    //Гравитация
    _height;
    _width;
    _player;
    _floor;
    _gravity;
    _gamespeed;
    _pause;
    _obstacles;
    _background;
    constructor(states) {
        super(states);
        this._height = render.VIRTUAL_HEIGHT;
        this._width = render.VIRTUAL_WIDTH;
    }
    enter() {
        this._pause = false;
        let spawnrate = 3;
        let targetFPS = 60;
        let startPossitionX = this._width * 0.15;
        let startPossitionY = this._height * 0.15;
        this._gamespeed = (this._width / targetFPS) * 0.05;
        this._gravity = -this._width / targetFPS / targetFPS / 16;
        let jumph = this._width / targetFPS / 6;
        this._player = new Player(startPossitionX, startPossitionY, this._gravity, jumph, this._height * 0.1, this._height * 0.1, "rgba(255,0,0,0.5)");
        this._floor = new Floor(startPossitionY, "rgba(0,255,0,0.5)");
        this._obstacles = new Obstacles(targetFPS / spawnrate, this._gamespeed, this._player.hitboxHeight / 2, this._player.hitboxWidht / 2, startPossitionY, this._player.hitboxHeight, "rgba(0,0,255,0.5)");
        //src\resurses
        //src\classes\state machine\states\play.ts
        this._background = [
            new BackgroundImage("./dist/resurses/1_1.png", startPossitionY, -this._gamespeed / 4, 1602, 131),
            new BackgroundImage("./dist/resurses/2.png", startPossitionY, -this._gamespeed / 6, 800, 354),
            new BackgroundImage("./dist/resurses/3.png", startPossitionY, -this._gamespeed / 8, 579, 471),
            new BackgroundImage("./dist/resurses/4.png", startPossitionY, 0, 1200, 600),
        ];
    }
    exit() {
    }
    update(dt) {
        if (keys.wasPressed("Escape")) {
            this._pause = !this._pause;
        }
        if (keys.wasPressed("Enter")) {
            this._states.change(StateName.play);
        }
        if (!this._pause) {
            this._floor.update(dt);
            this._player.update(dt);
            this._obstacles.update(dt);
            if (this._player.collides(this._floor) || this._player.y < 0) {
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight);
            }
            if (this._obstacles.collide(this._player)) {
                this._states.change(StateName.lose);
            }
            let i;
            for (i = 0; i < this._background.length; i++) {
                this._background[i].update(dt);
            }
        }
    }
    draw() {
        let i;
        for (i = this._background.length - 1; i >= 0; i--) {
            this._background[i].draw();
        }
        this._player.draw();
        this._floor.draw();
        this._obstacles.draw();
    }
}
