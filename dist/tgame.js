import { RenderManager } from "./classes/render.js";
import { KeyManager } from "./classes/keys.js";
import { Player } from "./classes/player.js";
import { Floor } from "./classes/floor.js";
//Объект рендера на экран
let renderManager;
let keys;
//Тестовый объект
let player;
let floor;
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
    VIRTUAL_HEIGHT = 100;
    VIRTUAL_WIDTH = 100;
    renderManager = new RenderManager(document.getElementById('mycanvas'), VIRTUAL_WIDTH, VIRTUAL_HEIGHT, 600, 700);
    //Размер холста в пикселях
    renderManager.WINDOW_HEIGHT = 700;
    renderManager.WINDOW_WIDTH = 600;
    ASPECT_RATIO = renderManager.ASPECT_RATIO;
    keys = new KeyManager();
    //------Ваш код-----
    GRAVITY = -VIRTUAL_HEIGHT * 0.000005;
    let startPossitionY = 15;
    //Инициализируем тестовый объект
    player = new Player(renderManager, keys, 10, startPossitionY, GRAVITY, 20, 10, "rgba(255,0,0,0.5)");
    floor = new Floor(renderManager, startPossitionY, "rgba(0,255,0,0.5)");
    //------------------
    requestAnimationFrame(gameloop);
}
//Игровая логика
function update(dt) {
    fps = 1000 / dt;
    floor.update(dt);
    player.update(dt);
    if (player.collides(floor) || player.y < 0) {
        player.onFloor(floor.y + floor.hitboxHeight);
    }
    keys.clear();
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
        //renderManager.drawDebugText(key, 5, posy)
        posy += 20;
    }
    renderManager.drawRenderDebugText();
    //Вывод
    player.draw();
    floor.draw();
}
//Время между прошлым и текущим кадром
function getDeltaTime(now) {
    let dt = now - then;
    then = now;
    return dt;
}
//-----User Inputs-----
function keyDown(e) {
    keys.press(e.key);
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
