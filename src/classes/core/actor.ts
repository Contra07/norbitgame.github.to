import { render } from "../../engine.js"
import { GameObject } from "./game object.js"
import { Sprite } from "./sprite.js"

export class Actor extends GameObject{
    //--------Поля--------   
    
    //Координаты
    private _x: number
    private _y: number
    //Вектор скорости
    private _dx: number
    private _dy: number
    //Вектор ускорения
    private _d2x: number
    private _d2y: number
    //Хитбокс
    private _hitboxHeight: number
    private _hitboxWidht: number
    private _hitboxColor: string
    //Картинка
    protected _sprite!: Sprite

    //--------Конструктор--------

    constructor(x: number, y: number, h: number, w: number, color: string) {
        super()
        this._x = x
        this._y = y
        this._dx = 0
        this._dy = 0
        this._d2x = 0
        this._d2y = 0
        this._hitboxHeight = h
        this._hitboxWidht = w
        this._hitboxColor = color
    }

    //--------Свойства--------

    public get x():number {
        return this._x
    }

    public set x(x: number) {
        this._x = x
    }

    public get y():number {
        return this._y
    }

    public set y(y: number) {
        this._y = y
    }

    public get dx():number {
        return this._dx
    }

    public get dy():number {
        return this._dy
    }

    public set dx(dx: number) {
        this._dx = dx
    }

    public set dy(dy: number) {
        this._dy = dy
    }

    public get d2x():number {
        return this._dx
    }

    public get d2y():number {
        return this._dy
    }
    
    public set d2x(d2x: number) {
        this._d2x = d2x
    }

    public set d2y(d2y: number) {
        this._d2y = d2y
    }

    public get hitboxHeight(): number{
        return this._hitboxHeight
    }

    public set hitboxHeight(h: number){
        this._hitboxHeight = h
    }

    public get hitboxWidht(): number{
        return this._hitboxWidht
    }

    public set hitboxWidht(w: number){
        this._hitboxWidht = w
    }

    public get hitboxColor(): string{
        return this._hitboxColor
    }

    public set hitboxColor(color: string){
        this._hitboxColor = color
    }

    public get sprite(): Sprite{
        return this._sprite
    }

    //--------Основные функции--------
    
    public init(): void { }

    public update(dt: number): void { }

    public draw(): void { }

    //--------Кастомные функции--------
    
    //Движение объекта
    protected move(dt: number):void{
        this._x += this._dx * dt + this._d2x * dt* dt
        this._dx += this._d2x * dt
        this._y += this._dy * dt + this._d2y * dt* dt
        this._dy += this._d2y * dt
    }

    //Дебаг информация
    protected drawDebug():void{
        let posx = this._x
        let posy = this._y 
        for (let key in this) {
            render.drawMiddleText(key + ': ' + this[key], posx, posy+this._hitboxHeight)
            posy -= this.hitboxHeight /12
        }
    }

    //Визуализация хитбокса
    protected drawHitbox():void{
        render.drawSquare(this._x, this._y , this._hitboxHeight, this._hitboxWidht, this.hitboxColor)
    }

    //AABB Коллизия
    public collides(actor: Actor): boolean{
        if(actor._y < this._y+this._hitboxHeight && this._y < actor._y + actor._hitboxHeight &&
            actor.x < this._x+this.hitboxWidht && this._x < actor._x + actor.hitboxWidht){
                return true
            }
        return false
    }
}