import { KeyManager } from "./classes/managers/keys.js"
import { RenderManager } from "./classes/managers/render.js"
import { GameManager } from "./classes/managers/game.js"

//Ширина игрового мира
let VIRTUAL_WIDTH: number = 600
//Высота игрового мира
let VIRTUAL_HEIGHT: number = 600
//Размер холста в пикселях
let WINDOW_HEIGHT: number = 450

let WINDOW_WIDTH: number = 600
//Время прошлого кадра
let thenTime: number = 0

export let render: RenderManager 
export let keys: KeyManager 
export let game: GameManager 

//Инициализация
function init(): void {
    render = new RenderManager(
        <HTMLCanvasElement>document.getElementById('mycanvas'),
        VIRTUAL_WIDTH,
        VIRTUAL_HEIGHT,
        WINDOW_WIDTH,
        WINDOW_HEIGHT
    )
    keys = new KeyManager()
    game = new GameManager()
    window.addEventListener("keydown", keyDown, true);
    requestAnimationFrame(gameloop);
}

//Игрвой цикл
function gameloop(timeStamp: number) {
    render.clear()
    game.update(getDeltaTime(timeStamp))
    game.draw()
    keys.clear()
    requestAnimationFrame(gameloop)
}

//Время между прошлым и текущим кадром
function getDeltaTime(nowTime: number): number {
    let deltaTime: number = nowTime - thenTime
    thenTime = nowTime
    return deltaTime / 1000
}

//-----User Inputs-----

function keyDown(e: KeyboardEvent){
    keys.press(e.key)
}

init();



