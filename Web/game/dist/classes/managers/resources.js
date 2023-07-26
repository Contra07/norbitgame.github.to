import { Sprite } from "../core/sprite.js";
export class ResourcesManager {
    _sprites;
    constructor(pathes) {
        this._sprites = new Map();
        for (let path of pathes) {
            let sprite = new Sprite("../resources/game/images/" + path + ".png");
            this._sprites.set(path, sprite);
        }
    }
    async load() {
        for (let sprite of this._sprites.values()) {
            await sprite.load();
        }
    }
    getSprite(path) {
        return this._sprites.get(path);
    }
}
