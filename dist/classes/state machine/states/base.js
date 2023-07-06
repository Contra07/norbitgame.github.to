export class BaseState {
    _states;
    constructor(states) {
        this._states = states;
    }
    enter(params) { }
    exit() { }
    init() { }
    update(dt) { }
    draw() { }
}
