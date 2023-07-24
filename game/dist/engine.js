import { KeyManager } from "./classes/managers/keys.js";
import { RenderManager } from "./classes/managers/render.js";
import { GameManager } from "./classes/game.js";
import { ResourcesManager } from "./classes/managers/resources.js";
//window.OnLoad
//window.onresize
//resourcesToLoad--;
//    if (resourcesToLoad == 0) {
//TODO: Singleton game
//Ширина игрового мира
let VIRTUAL_WIDTH = 600;
//Высота игрового мира
let VIRTUAL_HEIGHT = 600;
//Размер холста в пикселях
let WINDOW_HEIGHT = window.innerHeight;
let WINDOW_WIDTH = window.innerWidth / 2;
//Время прошлого кадра
let thenTime = 0;
export let render;
export let keys;
export let game;
export let resourses;
//Инициализация
function init() {
    render = new RenderManager(document.getElementById('mycanvas'), VIRTUAL_WIDTH, VIRTUAL_HEIGHT, WINDOW_WIDTH, WINDOW_HEIGHT);
    keys = new KeyManager();
    game = new GameManager();
    game.init();
    window.addEventListener("keydown", keyDown, true);
    window.addEventListener("touchstart", touchStart, true);
    window.addEventListener("mousedown", mouseDown, true);
    window.addEventListener("resize", resize, true);
    resourses = new ResourcesManager([
        "floor",
        "player run 1",
        "player run 2",
        "player run 3",
        "player jump",
        "bglayer1",
        "bglayer1begin",
        "bglayer2",
        "bglayer2begin",
        "bglayer3",
        "bglayer3begin",
        "bglayer4",
        "bglayer5",
        "clouds",
        "empty",
        "coin1",
        "coin2",
        "coin3",
        "coin4",
        "banana",
        "garbage",
        "pigeon1",
        "pigeon2",
        "car",
        "bench",
        "norbitclose",
        "bgmenu",
        "bglose",
        "bgwin",
    ]);
    resize();
    resourses.load().then(() => {
        requestAnimationFrame(gameloop);
    });
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
    return deltaTime / 1000;
}
//-----User Inputs-----
function keyDown(e) {
    keys.press(e.key);
}
function touchStart(evt) {
    keys.press(" ");
}
function mouseDown() {
    keys.press(" ");
}
function resize() {
    let WINDOW_HEIGHT = 0;
    let WINDOW_WIDTH = 0;
    if (window.innerHeight <= window.innerWidth) {
        WINDOW_HEIGHT = window.innerHeight;
        WINDOW_WIDTH = window.innerHeight;
    }
    else {
        WINDOW_HEIGHT = window.innerHeight;
        WINDOW_WIDTH = window.innerWidth;
    }
    render.WINDOW_HEIGHT = WINDOW_HEIGHT;
    render.WINDOW_WIDTH = WINDOW_WIDTH;
}
init();
