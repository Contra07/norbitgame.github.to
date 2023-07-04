import { KeyManager } from "./classes/managers/keys.js";
import { RenderManager } from "./classes/managers/render.js";
import { GameManager } from "./classes/managers/game.js";
//Ширина игрового мира
let VIRTUAL_WIDTH = 600;
//Высота игрового мира
let VIRTUAL_HEIGHT = 400;
//Размер холста в пикселях
let WINDOW_HEIGHT = 600;
let WINDOW_WIDTH = 600;
//Время прошлого кадра
let thenTime = 0;
export let render;
export let keys;
export let game;
//Инициализация
function init() {
    render = new RenderManager(document.getElementById('mycanvas'), VIRTUAL_WIDTH, VIRTUAL_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT);
    keys = new KeyManager();
    game = new GameManager();
    window.addEventListener("keydown", keyDown, true);
    requestAnimationFrame(gameloop);
}
//Игрвой цикл
function gameloop(timeStamp) {
    render.clear();
    game.update(getDeltaTime(timeStamp));
    game.draw();
    keys.clear();
    requestAnimationFrame(gameloop);
}
//Время между прошлым и текущим кадром
function getDeltaTime(nowTime) {
    let deltaTime = nowTime - thenTime;
    thenTime = nowTime;
    return deltaTime;
}
//-----User Inputs-----
function keyDown(e) {
    keys.press(e.key);
}
init();