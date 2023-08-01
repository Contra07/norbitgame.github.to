import { Sprite } from "../core/sprite.js";

export class ResourcesManager{
    private _sprites: Map<string, Sprite>

    constructor(pathes: string[]) {
        this._sprites = new Map()
        for(let path of pathes) {
            let sprite = new Sprite("../resources/game/images/" + path + ".png")
            this._sprites.set( path, sprite);
        }
    }

    public async load(){
        for(let sprite of this._sprites.values()){
            await sprite.load()
        }
    }

    public getSprite(path: string){
        return <Sprite>this._sprites.get(path)
    }
}