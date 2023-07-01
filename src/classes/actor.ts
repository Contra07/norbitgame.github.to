import { renderManager } from "../tgame.js"

export class Actor {
    x: number
    y: number
    dx: number
    dy: number
    d2x: number
    d2y: number
    h: number
    w: number
    color: string = "rgba(255, 0,0, 0.4)"

    constructor(x: number, y: number, dx: number, dy: number, d2x: number, d2y: number, h: number, w: number) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.d2x = d2x
        this.d2y = d2y
        this.h = h
        this.w = w
    }
    
    public init(): void { }

    public update(dt: number): void {
        
    }

    public draw(): void {
        //renderManager.setFont(renderManager.DEBUG_FONT)
        this.drawDebug()
        this.drawHitbox()
    }

    //Дебаг информация
    private drawDebug():void{
        renderManager.setColor(this.color)
        let posx = this.x
        let posy = this.y
        for (let key in this) {
            renderManager.drawDebugText(key + ': ' + this[key], posx, posy)
            posy -= 10
        }
    }

    private drawHitbox():void{
        //ctx.fillStyle = "rgba(255, 0,0, 0.4)";
        //Отрисовываем тестовый объект
        renderManager.drawSquare(this.x, this.y , this.h, this.w)
    }

    //Движение объекта
    protected move(dt: number):void{
        this.dx += this.d2x * dt
        this.x += this.dx * dt
        this.dy += this.d2y * dt
        this.y += this.dy * dt
    }

    //Нажатие кнопки
    public keyDown(keyCode: string): void{

    }

    public keyUp(keycode: string): void{
        
    }
}