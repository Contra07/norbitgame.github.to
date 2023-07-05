import { Sprite } from "../game objects/sprite"

export class RenderManager {
    //--------Поля--------

    //Элемент Canvas на странице 
    private _canvas: HTMLCanvasElement
    //Контекст рисования
    private _ctx: CanvasRenderingContext2D
    //Соотношенеи сторон экрана
    private _ascpectRatio: number
    //Ширина игрового мира
    private _virtualWidth: number
    private _virtualHeight: number
    //Коэфиценты проекции (Мир игры отличается от разрешения) 
    private _scaleX: number
    private _scaleY: number
    private _debugFont: string = '13 px serif'
    private _smallFont: string = "10 px serif"
    private _middleFont: string = "bold 20px Arial"
    private _bigFont: string = "20 px serif"

    //--------Конструктор--------

    constructor(canvas: HTMLCanvasElement, virtualWidth: number, virtualHeight: number, window_w: number, window_h: number) {
        this._canvas = canvas
        this._ctx = <CanvasRenderingContext2D>canvas.getContext("2d")
        this._virtualHeight = virtualHeight
        this._virtualWidth = virtualWidth
        this._canvas.height = window_h
        this._canvas.width = window_w
        this._ascpectRatio = this._canvas.width / this._canvas.height;
        this._scaleX = this._canvas.width / this._virtualWidth
        this._scaleY = this._canvas.width / this._virtualWidth
    }

    //--------Свойства--------

    //Ширина экрана
    public get WINDOW_WIDTH(): number {
        return this._canvas.width
    }

    //Установка ширины экрана
    public set WINDOW_WIDTH(width: number) {
        this._canvas.width = width
        this._ascpectRatio = this._canvas.width / this._canvas.height;
        this._scaleX = this._canvas.width / this._virtualWidth
        this._scaleY = this._canvas.width / this._virtualWidth
    }

    //Высота экрана
    public get WINDOW_HEIGHT(): number {
        return this._canvas.height
    }

    //Установка высоты экрана
    public set WINDOW_HEIGHT(height: number) {
        this._canvas.height = height
        this._ascpectRatio = this._canvas.width / this._canvas.height;
    }

    //Высота мира
    public get VIRTUAL_HEIGHT(): number {
        return this._virtualHeight
    }

    //Ширина мира
    public get VIRTUAL_WIDTH(): number {
        return this._virtualWidth
    }

    //Соотношение сторон
    public get ASPECT_RATIO(): number{
        return this._ascpectRatio
    }

    //-------Функции проекции--------

    //Проекция координат
    private projectCoords(x: number, y: number): { x: number, y: number } {
        return {
            x: x * this._scaleX,
            y: (this._virtualHeight - y) * this._scaleY + this.WINDOW_HEIGHT - (this.WINDOW_WIDTH * this._virtualHeight) / this._virtualWidth 
        }
    }

    //Проекция размера
    private projectSize(w: number, h: number): { width: number, height: number } {
        return {
            width: w * this._scaleX,
            height: h * this._scaleY
        }
    }

    //-------Функции отрисовки--------

    //Очистка экрана
    public clear(): void {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height)
    }

    //Установка шрифта
    public setFont(font: string): void {
        this._ctx.font = font
    }

    //Установка цвета
    public setColor(color: string): void {
        this._ctx.fillStyle = color
    }

    //Вывод текста (без проекции)
    public drawMiddleText(text: string, x: number, y: number): void {
        let tmpFont: string = <string> this._ctx.font
        this.setFont(this._middleFont)
        let coords = this.projectCoords(x,y);
        this._ctx.fillText(text, coords.x, coords.y)
        this.setFont(tmpFont)
    }

    //Вывод дебаг текста (без проекции)
    public drawDebugText(text: string, x: number, y: number): void {
        let tmpColor: string = <string>this._ctx.fillStyle
        let tmpFont: string = <string> this._ctx.font
        this.setColor("black")
        this.setFont(this._debugFont)
        this._ctx.fillText(text, x, y)
        this.setColor(tmpColor)
        this.setFont(tmpFont)
    }

    //Отрисовка квадрата (с учетом проекции)
    public drawSquare(x: number, y: number, h: number, w: number, color: string): void {
        let tmpColor: string = <string>this._ctx.fillStyle
        this.setColor(color)
        let coords = this.projectCoords(x, y)
        let size = this.projectSize(w, h)
        this._ctx.fillRect(coords.x, coords.y-size.height, size.width, size.height)
        this.setColor(tmpColor)
    }

    public drawImage(image: HTMLImageElement, x: number, y: number){
        //let coords = this.projectCoords(x, y)
        
        this._ctx.drawImage(image, x, this.WINDOW_HEIGHT-y-image.height)
    }

    public drawSprite(sprite: Sprite, x: number, y: number){
        this._ctx.drawImage(sprite.image, x, this.WINDOW_HEIGHT-y-sprite.height)
    }

    //-------Дебаг информация--------
    public drawRenderDebugText(): void {
        let tmpColor: string = <string>this._ctx.fillStyle
        let tmpFont: string = <string> this._ctx.font
        this.setColor("black")
        this.setFont(this._debugFont)
        let posy = 20
        this.drawDebugText(this._virtualWidth.toString() + " x "+this._virtualHeight.toString(), 5, posy)
        posy += 20
        this.drawDebugText(this.WINDOW_WIDTH.toString() + " x "+this.WINDOW_HEIGHT.toString(), 5, posy)
        this.setColor(tmpColor)
        this.setFont(tmpFont)
    }
    
}
