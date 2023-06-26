/** @type {HTMLCanvasElement} */
/** @type {CanvasRenderingContext2D} */

//Элемент canvas на странице
canvas = document.getElementById("mycanvas");
//Контекст, который содержит функции отрисовки
ctx = canvas.getContext("2d");
//Шрифты
const debugFont = "15px serif";
//Время прошлого кадра
let then = 0;
//Время между предыдущим и текущим кадром
//let dt = 0;
//Фпс
let fps = 0;
//Коэфицент проекции (Мир игры в сто раз больше разрешения)
let k = 0.01;
//Тестовый объект
let square = null;
//Ширина игроаого мира
const width = canvas.width / k;
//Высота игрового мира
const height = canvas.height / k;

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
    }
    
    init(){

    }
    
    update(dt){
        //Коллизия со стенами
        if (this.x + this.w > width) {
            this.x = width - this.w;
            this.dx = 0;
            this.d2x *= -1;
        } 
        if (this.x < 0) {
            this.x = 0;
            this.dx = 0;
            this.d2x *= -1;
        }
        //Движение объекта
        this.dx += this.d2x*dt
        this.x += this.dx*dt;
        this.dy += this.d2y*dt
        this.y += this.dy*dt;
    }

    draw(){
    //Отрисовываем тестовый объект
        drawSquare(this.x, this.y, this.h, this.w);
    }
    
}



//-------Функции отрисовки--------

//Очистка экрана
function clear() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

//Вывод текста
function drawText(text, x, y) {
    //coords = projectCoords(x,y);
    ctx.fillText(text, x, y);
}

//Устанвока шрифта
function setFont(font) {
    ctx.font = font;
}

//Отрисовка квадрата (с учетом проекции) 
function drawSquare(x, y, h, w) {
    let coords = projectCoords(x, y);
    let size = projectSize(h, w);
    ctx.fillRect(coords.x, coords.y, size.height, size.width);
}

//-------Проекция--------

//Проекция координат
function projectCoords(x, y) {
    return {
        x: x * k,
        y: canvas.height - y * k,
    };
}

//Проекция размера
function projectSize(h, w) {
    return {
        height: h * k,
        width: w * k,
    };
}

//-------Основная логика--------

//Инициализация переменных перед запуском игры
function init() {
    //------Ваш код-----
    //Инициализируем тестовый объект
    square = new Square(0,30000,0,0,1,0,10000,10000);
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
    const indicators = {
        fps: "FPS: " + Math.round(fps),
        //dt: "Delta T: " + dt,
        squarex: "X: " + Math.round(square.x),
        squarey: "Y: " + Math.round(square.y),
    };
    setFont(debugFont);
    let posy = 20;
    for (let key in indicators) {
        drawText(indicators[key], 5, posy);
        posy += 20;
    }
    square.draw();
}

//Время между прошлым и текущим кадром
function getDeltaTime(now) {
    dt = now - then;
    then = now;
    return dt;
}

//Игровой цикл (Не модифицировать)
function gameloop(timeStamp) {
    update(getDeltaTime(timeStamp));
    draw();
    //Что за timeStamp - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#return_value
    requestAnimationFrame(gameloop);
}

init();
