import { KeyManager } from "./classes/keys.js";
import { RenderManager } from "./classes/render.js";
import { GameManager } from "./game.js";
//Ширина игрового мира
let VIRTUAL_WIDTH = 600;
//Высота игрового мира
let VIRTUAL_HEIGHT = 600;
//Размер холста в пикселях
let WINDOW_HEIGHT = 600;
let WINDOW_WIDTH = 600;
//Время прошлого кадра
let thenTime = 0;
let render;
let keys;
let game;
//-----Игровой цикл----
function init() {
    render = new RenderManager(document.getElementById('mycanvas'), VIRTUAL_WIDTH, VIRTUAL_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT);
    keys = new KeyManager();
    game = new GameManager(render, keys);
    window.addEventListener("keydown", keyDown, true);
    requestAnimationFrame(gameloop);
}
function gameloop(timeStamp) {
    render.clear();
    game.update(getDeltaTime(timeStamp));
    game.draw();
    keys.clear();
    //Что за timeStamp - https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame#return_value
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
