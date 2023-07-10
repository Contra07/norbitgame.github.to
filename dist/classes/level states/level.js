export class Level {
    //TODO: Transition
    //Уровни
    _levels;
    //Сущности
    _coins;
    _obstacles;
    _background;
    //Таймеры
    _levelTimer;
    _transitionTime;
    constructor(levels, levelTimer, coins, obstacles, background) {
        this._levels = levels;
        this._levelTimer = levelTimer;
        this._coins = coins;
        this._obstacles = obstacles;
        this._background = background;
        this._transitionTime = 0;
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
    isEnd() {
        return this._levelTimer < 0;
    }
    update(dt) {
        this._levelTimer -= dt;
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
