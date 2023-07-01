import { renderManager } from "../tgame.js";
export class Actor {
    x;
    y;
    dx;
    dy;
    d2x;
    d2y;
    h;
    w;
    color = "rgba(255, 0,0, 0.4)";
    constructor(x, y, dx, dy, d2x, d2y, h, w) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.d2x = d2x;
        this.d2y = d2y;
        this.h = h;
        this.w = w;
    }
    init() { }
    update(dt) {
    }
    draw() {
        //renderManager.setFont(renderManager.DEBUG_FONT)
        this.drawDebug();
        this.drawHitbox();
    }
    //Дебаг информация
    drawDebug() {
        renderManager.setColor(this.color);
        let posx = this.x;
        let posy = this.y;
        for (let key in this) {
            renderManager.drawDebugText(key + ': ' + this[key], posx, posy);
            posy -= 10;
        }
    }
    drawHitbox() {
        //ctx.fillStyle = "rgba(255, 0,0, 0.4)";
        //Отрисовываем тестовый объект
        renderManager.drawSquare(this.x, this.y, this.h, this.w);
    }
    //Движение объекта
    move(dt) {
        this.dx += this.d2x * dt;
        this.x += this.dx * dt;
        this.dy += this.d2y * dt;
        this.y += this.dy * dt;
    }
    //Нажатие кнопки
    keyDown(keyCode) {
    }
    keyUp(keycode) {
    }
}
