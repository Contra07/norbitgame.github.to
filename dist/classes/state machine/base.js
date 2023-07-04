export class BaseState {
    _states;
    constructor(states) {
        this._states = states;
    }
    enter() { }
    exit() { }
    init() { }
    update(dt) { }
    draw() { }
}
