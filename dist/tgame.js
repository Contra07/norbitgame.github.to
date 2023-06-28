"use strict";
/** @type {HTMLCanvasElement} */
/** @type {CanvasRenderingContext2D} */
//Элемент canvas на странице
let canvas = document.getElementById('mycanvas');
//Контекст, который содержит функции отрисовки
let ctx = canvas.getContext("2d");
//Размер холста в пикселях
canvas.width = window.screen.width / 2;
canvas.height = window.screen.height / 2;
//Коэфицент масштабирование 
const SCALE = 1;
//Соотношение сторон
const ASPECT_RATIO = canvas.width / canvas.height;
//Ширина игрового мира
const VIRTUAL_WIDTH = ASPECT_RATIO * SCALE;
//Высота игрового мира
const VIRTUAL_HEIGHT = (1 / ASPECT_RATIO) * SCALE;
//Коэфиценты проекции (Мир игры отличается от разрешения) 
const SCALE_X = canvas.width / VIRTUAL_WIDTH;
const SCALE_Y = (canvas.width / ASPECT_RATIO) / VIRTUAL_HEIGHT;
//Шрифты
const DEBUG_FONT = '13 px serif';
//Время прошлого кадра
let then = 0;
//Фпс
let fps = 0;
//Тестовый объект
let square;
//Гравитация
const GRAVITY = -VIRTUAL_HEIGHT * 0.000008;
//Тестовый класс объекта для отрисовки
class Square {
    constructor(x, y, dx, dy, d2x, d2y, h, w) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.d2x = d2x;
        this.d2y = d2y;
        this.h = h;
        this.w = w;
        this.isJump = false;
    }
    init() { }
    update(dt) {
        //Движение объекта
        this.dx += this.d2x * dt;
        this.x += this.dx * dt;
        this.dy += this.d2y * dt;
        this.y += this.dy * dt;
        //Коллизия со стенами
        if (this.x + this.w > VIRTUAL_WIDTH) {
            this.x = VIRTUAL_WIDTH - this.w;
            this.dx = 0;
        }
        if (this.x < 0) {
            this.dx = 0;
            this.x = 0;
        }
        if (this.y > VIRTUAL_HEIGHT) {
            this.dy = 0;
            this.y = VIRTUAL_HEIGHT;
        }
        if (this.y < 0) {
            this.dy = 0;
            this.y = 0;
            this.isJump = false;
        }
    }
    draw() {
        setFont(DEBUG_FONT);
        //Дебаг
        let pos1 = projectCoords(this.x, this.y + this.h);
        for (let key in this) {
            drawText(key + ': ' + this[key], pos1.x, pos1.y);
            pos1.y -= 10;
        }
        ctx.fillStyle = "rgba(255, 0,0, 0.4)";
        //Отрисовываем тестовый объект
        drawSquare(this.x, this.y + this.h, this.h, this.w);
    }
    jump() {
        if (!square.isJump) {
            square.isJump = true;
            square.dy = VIRTUAL_HEIGHT / 300;
        }
    }
    //Нажатие кнопки
    keyDown(keyCode) {
        //console.log(keyCode)
        if (keyCode == " ") {
            this.jump();
        }
    }
    keyUp(keycode) {
    }
}
class Rect extends Square {
    constructor(x, y, dx, dy, d2x, d2y, h, w) {
        super(x, y, dx, dy, d2x, d2y, h, w);
    }
    jump() {
        if (!square.isJump) {
            square.isJump = true;
            square.dy = VIRTUAL_HEIGHT;
        }
    }
}
//-------Функции отрисовки--------
//Очистка экрана
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
//Вывод текста
function drawText(text, x, y) {
    //coords = projectCoords(x,y);
    ctx.fillText(text, x, y);
}
//Устанвока шрифта
function setFont(font) {
    ctx.fillStyle = "rgba(0, 0, 0 , 1)";
    ctx.font = font;
}
//Отрисовка квадрата (с учетом проекции)
function drawSquare(x, y, h, w) {
    let coords = projectCoords(x, y);
    let size = projectSize(h, w);
    ctx.fillRect(coords.x, coords.y, size.width, size.height);
}
//-------Проекция--------
//Проекция координат
function projectCoords(x, y) {
    return {
        x: x * SCALE_X,
        y: (VIRTUAL_HEIGHT - y) * SCALE_Y + canvas.height - canvas.width / ASPECT_RATIO
    };
}
//Проекция размера
function projectSize(h, w) {
    return {
        height: h * SCALE_Y,
        width: w * SCALE_X
    };
}
//-------Основная логика--------
//Инициализация переменных перед запуском игры
function init() {
    window.addEventListener("keydown", keyDown, true);
    window.addEventListener("keyup", keyUp, true);
    //------Ваш код-----
    //Инициализируем тестовый объект
    square = new Square(VIRTUAL_WIDTH * 0.2, VIRTUAL_HEIGHT / 20, 0, 0, 0, GRAVITY, VIRTUAL_HEIGHT / 3, VIRTUAL_WIDTH / 20);
    //------------------
    requestAnimationFrame(gameloop);
}
//Игровая логика
function update(dt) {
    fps = 1000 / dt;
    square.update(dt);
}
//Отрисовка объектов
function draw() {
    //Очищаем
    clear();
    //Индикаторы
    let indicators = {
        fps: 'FPS: ' + Math.round(fps).toString(),
        ascpectRatio: 'AS: ' + ASPECT_RATIO.toString(),
        width: 'W: ' + VIRTUAL_WIDTH.toString(),
        height: 'H: ' + VIRTUAL_HEIGHT.toString(),
        gravity: 'G: ' + GRAVITY.toString()
    };
    setFont(DEBUG_FONT);
    let posy = 20;
    for (let key in indicators) {
        drawText(key, 5, posy);
        posy += 20;
    }
    //Вывод
    square.draw();
}
//Время между прошлым и текущим кадром
function getDeltaTime(now) {
    let dt = now - then;
    then = now;
    return dt;
}
//-----User Inputs-----
function keyDown(e) {
    //console.log(e.key)
    square.keyDown(e.key);
}
function keyUp(e) {
}
//-----Игровой цикл----
function gameloop(timeStamp) {
    update(getDeltaTime(timeStamp));
    draw();
    //Что за timeStamp - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#return_value
    requestAnimationFrame(gameloop);
}
//-----Запуск игры----
init();
