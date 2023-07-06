export interface State{
    enter(params?: any): void
    exit(): void
    init(): void
    update(dt: number): void
    draw(): void
}

