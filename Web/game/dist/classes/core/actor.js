import { render } from "../../engine.js";
import { GameObject } from "./game object.js";
export class Actor extends GameObject {
    //--------Поля--------   
    //Координаты
    _x;
    _y;
    //Вектор скорости
    _dx;
    _dy;
    //Вектор ускорения
    _d2x;
    _d2y;
    //Хитбокс
    _hitboxHeight;
    _hitboxWidht;
    //Для отрисовки
    //Цветной квадрат
    _hitboxColor;
    //Картинка
    _sprite;
    //Анимация
    _animation;
    //--------Конструктор--------
    constructor(x, y, h, w, color, sprite, animation) {
        super();
        this._x = x;
        this._y = y;
        this._dx = 0;
        this._dy = 0;
        this._d2x = 0;
        this._d2y = 0;
        this._hitboxHeight = h;
        this._hitboxWidht = w;
        if (color) {
            this._hitboxColor = color;
        }
        if (sprite) {
            this._sprite = sprite;
        }
        if (animation) {
            this._animation = animation;
        }
    }
    //--------Свойства--------
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get dx() {
        return this._dx;
    }
    get dy() {
        return this._dy;
    }
    set dx(dx) {
        this._dx = dx;
    }
    set dy(dy) {
        this._dy = dy;
    }
    get d2x() {
        return this._dx;
    }
    get d2y() {
        return this._dy;
    }
    set d2x(d2x) {
        this._d2x = d2x;
    }
    set d2y(d2y) {
        this._d2y = d2y;
    }
    get hitboxHeight() {
        return this._hitboxHeight;
    }
    set hitboxHeight(h) {
        this._hitboxHeight = h;
    }
    get hitboxWidht() {
        return this._hitboxWidht;
    }
    set hitboxWidht(w) {
        this._hitboxWidht = w;
    }
    get hitboxColor() {
        return this._hitboxColor;
    }
    set hitboxColor(color) {
        this._hitboxColor = color;
    }
    get sprite() {
        return this._sprite;
    }
    set sprite(sprite) {
        this._sprite = sprite;
    }
    get animation() {
        return this._animation;
    }
    set animation(anim) {
        this._animation = anim;
    }
    //--------Основные функции--------
    init() { }
    update(dt) {
        if (this._animation) {
            this._animation.update(dt);
            this._sprite = this._animation.current;
        }
    }
    draw() { }
    //--------Кастомные функции--------
    //Движение объекта
    move(dt) {
        this._x += this._dx * dt + this._d2x * dt * dt;
        this._dx += this._d2x * dt;
        this._y += this._dy * dt + this._d2y * dt * dt;
        this._dy += this._d2y * dt;
    }
    //Дебаг информация
    drawDebug() {
        let posx = this._x;
        let posy = this._y;
        for (let key in this) {
            render.drawMiddleText(key + ': ' + this[key], posx, posy + this._hitboxHeight);
            posy -= this.hitboxHeight / 12;
        }
    }
    //Виазализация актора
    drawActor(debug) {
        render.drawActor(this, debug);
    }
    //AABB Коллизия
    collides(actor) {
        if (actor._y < this._y + this._hitboxHeight && this._y < actor._y + actor._hitboxHeight &&
            actor.x < this._x + this.hitboxWidht && this._x < actor._x + actor.hitboxWidht) {
            return true;
        }
        return false;
    }
}
