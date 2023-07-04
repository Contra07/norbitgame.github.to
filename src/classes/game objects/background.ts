import { Actor } from "./actor.js";
import { BackgroundImage } from "./bgimage.js";

export class Background extends Actor{
    
    private _images: BackgroundImage[]
    
    constructor(images: BackgroundImage[], speed: number) {
        super(0,0,0,0,"white");
        this._images = images
    }

    public draw(): void {
        
    }
}

