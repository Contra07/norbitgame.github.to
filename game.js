/** @type {HTMLCanvasElement} */
/** @type {CanvasRenderingContext2D} */


//Элемент canvas на странице
canvas = document.getElementById('mycanvas');
//Контекст, который содержит функции отрисовки
ctx = canvas.getContext("2d");

//Тестовый класс объекта для отрисовки
class Square{
    constructor(x,y,h,w){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
        this.v = 0.5;
    }
}

//Time and fps
let then = 0;
let dt = 0;
let fps = 0;

///Тестовый объект
let square = null;

//-------Функции отрисовки--------

//Очистка экрана
function clear() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

//Вывод текста
function drawText(text,x,y){
    ctx.fillText(text,x,y);
}

//Устанвока шрифта
function setFont(font){
    ctx.font = font;
}

//Отрисовка квадрата
function drawSquare(x,y,h,w){
    ctx.fillRect(x, y, h, w);
}

//-------Основная логика--------

//Инициализация переменных перед запуском игры
function init(){
    //------Ваш код-----

    //Инициализируем тестовый объект
    square = new Square(20,150,100,100);

    //------------------
    requestAnimationFrame(gameloop);
}

//Игровая логика
function update(dt) {
    fps = 1000 / dt;
    //----Ваш код---
    if((square.x + square.w) >= canvas.width || square.x  <= 0)
    {
        square.v *= -1;
    }
    square.x += square.v*dt;
    //------------
}

//Отрисовка объектов
function draw(){
    //Очищаем
    clear();
    //Выставляем шрифт
    setFont("20px serif");
    //Выводим fps
    drawText("FPS: " + fps,20,20);
    //Выводим dt
    drawText("Delta T: " + dt,20,40);
    //Выводим позицию тестового объекта
    drawText("X: " + square.x,20,60);
    drawText("Y: " + square.y,20,80);
    //Отрисовываем тестовый объект
    drawSquare(square.x, square.y,square.h,square.w);
}

//Время между прошлым и текущим кадром
function getDeltaTime(now){
    dt = now - then
    then = now;
    return dt;
}

//Игровой цикл (Не модифицировать)
function gameloop(timeStamp){
    update(getDeltaTime(timeStamp));
    draw();
    //Что за timeStamp - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#return_value
    requestAnimationFrame(gameloop);
}

init();


