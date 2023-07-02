export class StateMachine {
    states;
    constructor(play) {
        this.states = new Map([
            [play.name(), play]
        ]);
    }
    Change;
}
