import { Sprite } from "../core/sprite.js";
export class ResourcesManager {
    _sprites;
    constructor(pathes) {
        this._sprites = new Map();
        for (let path of pathes) {
            let sprite = new Sprite("./dist/resurses/" + path + ".png");
            this._sprites.set(path, sprite);
            sprite.load();
        }
    }
    getSprite(path) {
        return this._sprites.get(path);
    }
}
