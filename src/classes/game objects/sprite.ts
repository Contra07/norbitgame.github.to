import { render } from "../../engine.js"
import { Actor } from "./actor.js"

export class Sprite {
    private _image: HTMLImageElement
    private _source: string
    private _width: number
    private _height: number

    constructor(source: string) {
        this._image = <HTMLImageElement>new Image()
        this._image.src = source
        this._source = this._image.src
        this._width = this._image.width
        this._height = this._image.height
    }

    public get image(): HTMLImageElement {
        return this._image
    }

    public get width(): number {
        return this._width
    }

    public get height(): number {
        return this._height
    }
}