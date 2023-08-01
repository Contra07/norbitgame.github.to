export class Sprite {
    private _image: HTMLImageElement
    private _width: number
    private _height: number
    private _source: string
    private _isLoaded: boolean

    constructor(source: string) {
        this._image = new Image()
        this._source = source
        this._width = -1
        this._height = -1
        this._isLoaded = false
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

    public get source(): string{
        return this._image.src
    }

    public get isLoaded(): boolean{
        return this._isLoaded
    }

    public load(): Promise<void>{
        return new Promise<void>( resolve => {
            this._image.onload = () =>{
                this._width = this._image.width
                this._height = this._image.height
                this._isLoaded = true
                resolve()
            }
            this._image.src = this._source
        })
    }
}