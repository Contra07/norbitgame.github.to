import { KeyManager } from "./classes/managers/keys.js"
import { RenderManager } from "./classes/managers/render.js"
import { GameManager } from "./classes/game.js"
import { ResourcesManager } from "./classes/managers/resources.js"

//window.OnLoad
//window.onresize
//resourcesToLoad--;
//    if (resourcesToLoad == 0) {

//TODO: Singleton game

//Ширина игрового мира
let VIRTUAL_WIDTH: number = 600
//Высота игрового мира
let VIRTUAL_HEIGHT: number = 600
//Размер холста в пикселях
let WINDOW_HEIGHT: number =  window.innerHeight

let WINDOW_WIDTH: number = window.innerWidth /2 
//Время прошлого кадра
let thenTime: number = 0

export let render: RenderManager 
export let keys: KeyManager 
export let game: GameManager 
export let resourses: ResourcesManager

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
    game.init()
    window.addEventListener("keydown", keyDown, false);
    //window.addEventListener("touchstart", touchStart, false);
    window.addEventListener("mousedown", mouseDown, false);
    window.addEventListener("resize", resize, false)
    resourses = new ResourcesManager(
        [
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
            "coinlogo",
            "lifelogo",
        ]
    )
    resize();
    resourses.load().then(() => {
        requestAnimationFrame(gameloop)
    })
}


//Игрвой цикл
function gameloop(timeStamp: number):void {
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
    e.preventDefault()
    keys.press(e.key)
}

function touchStart(evt: TouchEvent) 
{
    window.removeEventListener("keydown", keyDown, false)
    evt.preventDefault()
    keys.press(" ")
}

function mouseDown() 
{
    keys.press(" ")
}

function resize(){
    let WINDOW_HEIGHT: number =  0
    let WINDOW_WIDTH: number = 0
    if(window.innerHeight <= window.innerWidth){
        WINDOW_HEIGHT=  window.innerHeight
        WINDOW_WIDTH = window.innerHeight
    }
    else{
        WINDOW_HEIGHT=  window.innerHeight
        WINDOW_WIDTH = window.innerWidth
    }
    render.WINDOW_HEIGHT = WINDOW_HEIGHT
    render.WINDOW_WIDTH = WINDOW_WIDTH
}

init();



