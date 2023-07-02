export class BaseState {
    _name;
    _states;
    get name() {
        return this._name;
    }
    constructor(name) {
        this._name = name;
    }
    enter() {
    }
    exit() {
    }
    init(states) {
        this._states = states;
    }
    update(dt) {
    }
    draw() {
    }
}
