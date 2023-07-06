import { GameObject } from "../core/game object.js";
import { BackgroundSprite } from "../core/background sprite.js";

export class Background extends GameObject{
    
    private _images: BackgroundSprite[]
    
    constructor(images: BackgroundSprite[], speed: number) {
        super();
        this._images = images
    }

    public draw(): void {
        
    }
}

