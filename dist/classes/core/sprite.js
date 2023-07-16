export class Sprite {
    _image;
    _width;
    _height;
    _source;
    constructor(source) {
        this._image = new Image();
        this._source = source;
        this._width = -1;
        this._height = -1;
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
    get source() {
        return this._image.src;
    }
    load() {
        this.image.onload = () => {
            this._width = this._image.width;
            this._height = this._image.height;
        };
        this._image.src = this._source;
    }
}
