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
        this.v = 0.03;
    }
}



//Time and fps
let then = 0;
let dt = 0;
let fps = 0;

///тестовый объект
let square = null;


//Функции отрисовки

function clear() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function drawText(text,x,y){
    ctx.fillText(text,x,y);
}

function setFont(font){
    ctx.font = font;
}

function drawSquare(x,y,h,w){
    ctx.fillRect(x, y, h, w);
}

//Основная логика

function init(){
    //------Your code---
    //Инициализируем тестовый объект
    square = new Square(20,150,100,100);
    //Выставляем шрифт
    setFont("20px serif");
    //------------------
    requestAnimationFrame(gameloop);
}

function update(dt) {
    fps = 1000 / dt;
    //----Logic Here---
    square.x += square.v*dt;
    //square.y += 0.001;
    //console.log(dt);
    //------------
}

function draw(){
    //Очищаем
    clear();
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
    //Решение бага, что каждый второй кадр почему-то dt = 0
    if(now != then){
        dt = now - then
        then = now;
    }
    //console.log(dt + ' ' + then + ' ' + now + ' ')
    return dt;
}


function gameloop(timeStamp){
    if(timeStamp != undefined)
    {
        update(getDeltaTime(timeStamp));
    }
    draw();
    //https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#return_value
    requestAnimationFrame(gameloop);
}

init();
gameloop();


