import { Floor } from "./classes/floor.js";
import { KeyManager } from "./classes/keys.js";
import { Player } from "./classes/player.js";
import { RenderManager } from "./classes/render.js";

export class GameManager{
    private _keys: KeyManager
    private _render: RenderManager
    private _player: Player
    private _floor: Floor

    private gravity:number

    constructor(render: RenderManager, keys: KeyManager){
        this._render = render
        this._keys = keys
        this.gravity = -this._render.VIRTUAL_HEIGHT * 0.000005

        let startPossitionY = this._render.VIRTUAL_HEIGHT*0.15

        this._player = new Player(
            this._render, 
            this._keys, 
            this._render.VIRTUAL_WIDTH*0.15,
            startPossitionY,
            this.gravity,
            this._render.VIRTUAL_HEIGHT*0.0015,
            this._render.VIRTUAL_HEIGHT*0.1,
            this._render.VIRTUAL_HEIGHT*0.1,
            "rgba(255,0,0,0.5)"
            )

        this._floor = new Floor(
            render,
            startPossitionY,
            "rgba(0,255,0,0.5)"
        )
    }

    public init(){
        
    }

    public update(dt: number){
        this._floor.update(dt)
        this._player.update(dt)

        if(this._player.collides(this._floor) || this._player.y < 0){
            this._player.onFloor(this._floor.y + this._floor.hitboxHeight)
        }
    }

    public draw(){
        this._player.draw()
        this._floor.draw()
    }
}