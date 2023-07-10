import { GameObject } from "../core/game object.js";
export class LevelMachine extends GameObject {
    _levels;
    _currentLevel;
    _currentLevelNumber;
    _maxLevelNumber;
    constructor() {
        super();
        this._levels = new Map();
        this._currentLevelNumber = 0;
        this._maxLevelNumber = 0;
    }
    get current() {
        return this._currentLevel;
    }
    get isLastLevel() {
        return (this._currentLevelNumber == this._maxLevelNumber);
    }
    add(level) {
        this._levels.set(++this._maxLevelNumber, level);
        if (!this._currentLevel) {
            this._currentLevel = this._levels.get(this._maxLevelNumber);
        }
    }
    next() {
        let level = this._levels.get(++this._currentLevelNumber);
        if (level) {
            this._currentLevel.exit();
            level.enter(this._currentLevel.background);
            this._currentLevel = level;
        }
    }
    update(dt) {
        this._currentLevel.update(dt);
    }
    draw() {
        this._currentLevel.draw();
    }
}
