export interface State{
    enter(): void
    exit(): void
    init(): void
    update(dt: number): void
    draw(): void
}

