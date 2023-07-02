import { Render } from "./classes/render.js"
import { State } from "./interfaces/state.js"

//Ширина игрового мира
let VIRTUAL_WIDTH: number = 200
//Высота игрового мира
let VIRTUAL_HEIGHT: number = 200
//Размер холста в пикселях
let WINDOW_HEIGHT: number = 700
let WINDOW_WIDTH: number = 600
//Время прошлого кадра
let then: number = 0
//Фпс
let fps: number = 0

