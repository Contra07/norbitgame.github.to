import { Actor } from "./actor.js";
import { BackgroundSprite } from "./background sprite.js";

export class Background extends Actor{
    
    private _images: BackgroundSprite[]
    
    constructor(images: BackgroundSprite[], speed: number) {
        super(0,0,0,0,"white");
        this._images = images
    }

    public draw(): void {
        
    }
}

