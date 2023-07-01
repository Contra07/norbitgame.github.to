import { Actor } from "./classes/actor.js";
import { Render } from "./classes/render.js";
//Объект рендера на экран
export let renderManager;
//Тестовый объект
let square;
//Соотношение сторон
let ASPECT_RATIO;
//Ширина игрового мира
let VIRTUAL_WIDTH;
//Высота игрового мира
let VIRTUAL_HEIGHT;
//Время прошлого кадра
let then = 0;
//Фпс
let fps = 0;
//Гравитация
let GRAVITY;
//-------Основная логика--------
//Инициализация переменных перед запуском игры
function init() {
    window.addEventListener("keydown", keyDown, true);
    window.addEventListener("keyup", keyUp, true);
    VIRTUAL_HEIGHT = 50;
    VIRTUAL_WIDTH = 50;
    //------Ваш код-----
    //Инициализируем тестовый объект
    square = new Actor(10, 2, 0, 0, 0, 0, 40, 25);
    renderManager = new Render(document.getElementById('mycanvas'), VIRTUAL_WIDTH, VIRTUAL_HEIGHT);
    //Размер холста в пикселях
    renderManager.WINDOW_HEIGHT = 500;
    renderManager.WINDOW_WIDTH = 500;
    ASPECT_RATIO = renderManager.ASPECT_RATIO;
    GRAVITY = 0;
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
    renderManager.clear();
    //Индикаторы
    let indicators = {
        fps: 'FPS: ' + Math.round(fps).toString(),
        ascpectRatio: 'AS: ' + ASPECT_RATIO.toString(),
        width: 'W: ' + VIRTUAL_WIDTH.toString(),
        height: 'H: ' + VIRTUAL_HEIGHT.toString(),
        gravity: 'G: ' + GRAVITY.toString()
    };
    let posy = 20;
    for (let key in indicators) {
        renderManager.drawDebugText(key, 5, posy);
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
