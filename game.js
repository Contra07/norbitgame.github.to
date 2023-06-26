/** @type {HTMLCanvasElement} */
/** @type {CanvasRenderingContext2D} */

canvas = document.getElementById('mycanvas');
ctx = canvas.getContext("2d");

let time = 0;
let fps = 0;
//Функции отрисовки

function clear() {
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function drawText(text,x,y){
    ctx.font = "20px serif";
    ctx.fillText(text,x,y);
}

function drawSquare(x,y,h,w){
    ctx.fillRect(x, y, h, w);
}

//Основная логика

function init(){
    time = performance.now();
    requestAnimationFrame(update);
}

function update(dt) {
    this.square.x += 0.1;
    fps = 1 / (dt / 1000);
    requestAnimationFrame(update);
}

function draw(){
    clear();
    //this.window.ctx.fillRect(20, 10, 150, 100);
    drawText(fps,20,20)
    //DrawSquare(this.square);
}

function getDeltaTime(){
    let dt = timeStamp - game.time
    time = timeStamp;
    return dt;
}


function gameloop(){
    dt = getDeltaTime();
    game.Update(dt);
    game.Draw();
    requestAnimationFrame(this.GameLoop);
}

init();
gameloop();


//Класс 2D плоскости
class Plane{
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    Clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    DrawText(text,x,y){
        this.ctx.font = "20px serif";
        this.ctx.fillText(text,x,y)
    }

    DrawSquare(square){
        this.ctx.fillRect(square.x*10, square.y, square.h, square.w);
    }

}

class Square{
    constructor(x,y,h,w){
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;
    }
}

class Game {
    constructor(canvas) {
        this.window = new Plane(canvas);
        this.time = 0;
        this.fps = 0;
        this.square = new Square(10,100,20,20)
    }  
    
    Init(){
        this.time = performance.now()
    }

    Update(dt) {
        this.square.x += 0.1;
    }

    Draw(){
        this.window.Clear();
        //this.window.ctx.fillRect(20, 10, 150, 100);
        this.window.DrawText(this.fps,20,20)
        this.window.DrawSquare(this.square);
    }
}



