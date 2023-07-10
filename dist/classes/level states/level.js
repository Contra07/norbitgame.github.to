import { render } from "../../engine.js";
export class Level {
    //Уровни
    _levels;
    //Сущности
    _coins;
    _obstacles;
    _background;
    //Таймеры
    _levelTimer;
    _transitionBeginTime;
    _transitionEndTime;
    constructor(levels, levelTimer, gamespeed, coins, obstacles, background) {
        this._levels = levels;
        this._levelTimer = levelTimer;
        this._coins = coins;
        this._obstacles = obstacles;
        this._background = background;
        this._transitionBeginTime = render.VIRTUAL_WIDTH / gamespeed;
        this._transitionEndTime = render.VIRTUAL_WIDTH / gamespeed;
    }
    get obstacles() {
        return this._obstacles;
    }
    get coins() {
        return this._coins;
    }
    get background() {
        return this._background;
    }
    get isMainEnd() {
        return this._levelTimer < 0;
    }
    get isBeginEnd() {
        return this._transitionBeginTime < 0;
    }
    get isEndEnd() {
        return this._transitionEndTime < 0;
    }
    init() {
    }
    enter(layers) {
        let i;
        for (i = 0; i < this._background.length; i++) {
            this._background[i].transition(layers[i]);
        }
    }
    exit() {
    }
    update(dt) {
        if (!this.isBeginEnd) {
            this._transitionBeginTime -= dt;
            this._obstacles.stopSpawn();
            this._coins.stopSpawn();
        }
        else if (!this.isMainEnd) {
            this._levelTimer -= dt;
            this._obstacles.startSpawn();
            this._coins.startSpawn();
        }
        else if (!this.isEndEnd) {
            this._transitionEndTime -= dt;
            this._obstacles.stopSpawn();
            this._coins.stopSpawn();
        }
        this._obstacles.update(dt);
        this._coins.update(dt);
        let i;
        for (i = 0; i < this._background.length; i++) {
            this._background[i].update(dt);
        }
    }
    draw() {
        let i;
        for (i = this._background.length - 1; i >= 0; i--) {
            this._background[i].draw();
        }
        this._obstacles.draw();
        this._coins.draw();
    }
}
