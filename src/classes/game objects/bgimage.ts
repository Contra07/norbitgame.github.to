import { render } from "../../engine.js"
import { Actor } from "./actor.js"

export class BackgroundImage extends Actor{
    private _image: HTMLImageElement
    private _source: string
    private _width: number
    private _height: number
    private _actual_width: number
    private _actual_height: number

    constructor(source: string, y: number, speed:number) {
        super(0,y,0,0,"white")
        this._image = <HTMLImageElement>new Image()
        this._image.src = source
        this._source = this._image.src
        this._actual_width = this._image.width
        this._actual_height = this._image.height
        this.dx = speed
        this._width = this._actual_width/2
        this._height = this._actual_height
    }

    public update(dt: number): void {
        this.move(dt)
        this.x = this.x % this._width
    }

    public draw(): void {
        render.drawImage(this._image,this.x, this.y)
    }

}