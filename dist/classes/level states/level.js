import { State } from "../state machine/state.js";
export class Level extends State {
    //TODO: Transition
    //TODO: Level mashine class
    //Сущности
    _coins;
    _obstacles;
    _background;
    _levelTimer;
    _transitionTime;
    constructor(states, levelTimer, coins, obstacles, background) {
        super(states);
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
    enter(params) {
        if (params) {
            let levelP = params;
            let levelC = this._states.current;
            let i = 0;
            for (i = 0; i < levelC._background.length; i++) {
                levelC._background[i].transition(levelP._background[i]);
            }
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
