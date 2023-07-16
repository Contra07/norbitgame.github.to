export class Sprite {
    _image;
    _width;
    _height;
    _source;
    _isLoaded;
    constructor(source) {
        this._image = new Image();
        this._source = source;
        this._width = -1;
        this._height = -1;
        this._isLoaded = false;
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
    get isLoaded() {
        return this._isLoaded;
    }
    load() {
        return new Promise(resolve => {
            this._image.onload = () => {
                this._width = this._image.width;
                this._height = this._image.height;
                this._isLoaded = true;
                resolve();
            };
            this._image.src = this._source;
        });
    }
}
