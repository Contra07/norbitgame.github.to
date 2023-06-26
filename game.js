/** @type {HTMLCanvasElement} */
/** @type {CanvasRenderingContext2D} */

//Элемент canvas на странице
const canvas = document.getElementById('mycanvas')
//Контекст, который содержит функции отрисовки
const ctx = canvas.getContext('2d')
//Размер холста в пикселях
canvas.width = 423
canvas.height = 423

// Соотношение сторон
const ASPECT_RATIO = canvas.width / canvas.height
//Коэфицент масштабирование
const SCALE = 100
//Ширина игроаого мира
const VIRTUAL_WIDTH = ASPECT_RATIO * SCALE
//Высота игрового мира
const VIRTUAL_HEIGHT = (1 / ASPECT_RATIO) * SCALE
//Коэфиценты проекции (Мир игры больше разрешения)
const SCALE_X = canvas.width / VIRTUAL_WIDTH
const SCALE_Y = canvas.height / VIRTUAL_HEIGHT
//Шрифты
const DEBUG_FONT = '15px serif'

//Время прошлого кадра
let then = 0
//Фпс
let fps = 0
//Тестовый объект
let square = null
//Время между предыдущим и текущим кадром
//let dt = 0;

//Тестовый класс объекта для отрисовки
class Square {
    constructor(x, y, dx, dy, d2x, d2y, h, w) {
        this.x = x
        this.y = y
        this.dx = dx
        this.dy = dy
        this.d2x = d2x
        this.d2y = d2y
        this.h = h
        this.w = w
    }

    init() { }

    update(dt) {
        //Коллизия со стенами
        if (this.x + this.w > VIRTUAL_WIDTH) {
            this.x = VIRTUAL_WIDTH - this.w
            this.dx = 0
            this.d2x *= -1
        }
        if (this.x < 0) {
            this.x = 0
            this.dx = 0
            this.d2x *= -1
        }
        //Движение объекта
        this.dx += this.d2x * dt
        this.x += this.dx * dt
        this.dy += this.d2y * dt
        this.y += this.dy * dt
    }

    draw() {
        //Отрисовываем тестовый объект
        drawSquare(this.x, this.y, this.h, this.w)
    }
}

//-------Функции отрисовки--------

//Очистка экрана
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

//Вывод текста
function drawText(text, x, y) {
    //coords = projectCoords(x,y);
    ctx.fillText(text, x, y)
}

//Устанвока шрифта
function setFont(font) {
    ctx.font = font
}

//Отрисовка квадрата (с учетом проекции)
function drawSquare(x, y, h, w) {
    let coords = projectCoords(x, y)
    let size = projectSize(h, w)
    ctx.fillRect(coords.x, coords.y, size.height, size.width)
}

//-------Проекция--------

//Проекция координат
function projectCoords(x, y) {
    return {
        x: x * SCALE_X,
        y: (VIRTUAL_HEIGHT - y) * SCALE_Y
    }
}

//Проекция размера
function projectSize(h, w) {
    return {
        height: h * SCALE_Y,
        width: w * SCALE_X
    }
}

//-------Основная логика--------

//Инициализация переменных перед запуском игры
function init() {
    //------Ваш код-----
    //Инициализируем тестовый объект
    square = new Square(
        0,
        VIRTUAL_HEIGHT * 0.3,
        0,
        0,
        VIRTUAL_WIDTH * 0.000001,
        0,
        100 / SCALE_Y,
        100 / SCALE_X
    )
    //------------------
    requestAnimationFrame(gameloop)
}

//Игровая логика
function update(dt) {
    fps = 1000 / dt
    square.update(dt)
}

//Отрисовка объектов
function draw() {
    //Очищаем
    clear()

    //Индикаторы
    const indicators = {
        fps: 'FPS: ' + Math.round(fps),
        //dt: "Delta T: " + dt,
        kx: 'kx: ' + SCALE_X,
        ky: 'ky: ' + SCALE_Y,
        squarex: 'x: ' + Math.round(square.x),
        squarey: 'y: ' + Math.round(square.y),
        squarecanvasx: 'X: ' + Math.round(projectCoords(square.x, square.y).x),
        squarecanvasy: 'Y: ' + Math.round(projectCoords(square.x, square.y).y),
        ascpectRatio: 'AS: ' + ASPECT_RATIO,
        width: 'W: ' + VIRTUAL_WIDTH,
        height: 'H: ' + VIRTUAL_HEIGHT
    }
    setFont(DEBUG_FONT)
    let posy = 20
    for (let key in indicators) {
        drawText(indicators[key], 5, posy)
        posy += 20
    }
    square.draw()
}

//Время между прошлым и текущим кадром
function getDeltaTime(now) {
    dt = now - then
    then = now
    return dt
}

//Игровой цикл (Не модифицировать)
function gameloop(timeStamp) {
    update(getDeltaTime(timeStamp))
    draw()
    //Что за timeStamp - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#return_value
    requestAnimationFrame(gameloop)
}

init()
