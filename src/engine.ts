import { KeyManager } from "./classes/managers/keys.js"
import { RenderManager } from "./classes/managers/render.js"
import { GameManager } from "./classes/managers/game.js"

//Ширина игрового мира
let VIRTUAL_WIDTH: number = 600
//Высота игрового мира
let VIRTUAL_HEIGHT: number = 400
//Размер холста в пикселях
let WINDOW_HEIGHT: number = 600
let WINDOW_WIDTH: number = 600
//Время прошлого кадра
let thenTime: number = 0

let render: RenderManager 
let keys: KeyManager 
let game: GameManager 

//-----Игровой цикл----

function init(): void {
    render = new RenderManager(
        <HTMLCanvasElement>document.getElementById('mycanvas'),
        VIRTUAL_WIDTH,
        VIRTUAL_HEIGHT,
        WINDOW_WIDTH,
        WINDOW_HEIGHT
    )
    keys = new KeyManager()
    game = new GameManager(render, keys)
    window.addEventListener("keydown", keyDown, true);
    game.init()
    requestAnimationFrame(gameloop);
}

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
    return deltaTime
}

//-----User Inputs-----

function keyDown(e: KeyboardEvent){
    keys.press(e.key)
}

init();



