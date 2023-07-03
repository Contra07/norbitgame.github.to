import { Floor } from "../game objects/floor.js"
import { Obstacles } from "../game objects/obstacles.js"
import { Player } from "../game objects/player.js"
import { KeyManager } from "../managers/keys.js"
import { RenderManager } from "../managers/render.js"
import { BaseState } from "./base.js"

export class PlayState extends BaseState{

    //Гравитация
    private _keys: KeyManager
    private _render: RenderManager
    private _player: Player
    private _floor: Floor
    private _gravity:number
    private _pause: boolean
    private _obstacles: Obstacles

    public get name(): string{
        return this._name
    }

    constructor(name: string, render: RenderManager, keys: KeyManager){
        super(name)
        this._pause = false
        this._render = render
        this._keys = keys
        this._gravity = -this._render.VIRTUAL_HEIGHT * 0.000008

        let startPossitionY = this._render.VIRTUAL_HEIGHT*0.15

        this._player = new Player(
            this._render, 
            this._keys, 
            this._render.VIRTUAL_WIDTH*0.15,
            startPossitionY,
            this._gravity,
            this._render.VIRTUAL_HEIGHT*0.002,
            this._render.VIRTUAL_HEIGHT*0.1,
            this._render.VIRTUAL_HEIGHT*0.1,
            "rgba(255,0,0,0.5)"
            )

        this._floor = new Floor(
            render,
            startPossitionY,
            "rgba(0,255,0,0.5)"
        )

        this._obstacles = new Obstacles(render, 
            10, 
            0.3,
            this._player.hitboxHeight/2,
            this._player.hitboxWidht/2,
            startPossitionY,
            this._player.hitboxHeight,
            "rgba(0,0,255,0.5)"
        )
    }

    enter(): void {
        
    }

    exit(): void {

    }

    update(dt: number): void {
        if(this._keys.wasPressed("Escape")){
            this._pause = !this._pause 
        }

        if(!this._pause){
            this._floor.update(dt)
            this._player.update(dt)
            this._obstacles.update(dt)

            if(this._player.collides(this._floor) || this._player.y < 0){
                this._player.onFloor(this._floor.y + this._floor.hitboxHeight)
            }

            if(this._obstacles.collide(this._player)){
                this._pause = true
            }

            
        }
    }

    draw(): void {
        this._player.draw()
        this._floor.draw()
        this._obstacles.draw()
    }

}