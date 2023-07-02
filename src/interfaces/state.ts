import { StateMachine } from "../classes/managers/state machine"

export interface State{
    enter(): void
    exit(): void
    init(St: StateMachine): void
    update(dt: number): void
    draw(): void
    get name(): string
}