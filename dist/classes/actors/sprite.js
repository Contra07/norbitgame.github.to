export class Sprite {
    _image;
    _source;
    _width;
    _height;
    constructor(source) {
        this._image = new Image();
        this._image.src = source;
        this._source = this._image.src;
        this._width = this._image.width;
        this._height = this._image.height;
    }
    get image() {
        return this._image;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
}
