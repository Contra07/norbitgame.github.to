export class RenderManager {
    //--------Поля--------
    //Элемент Canvas на странице 
    _canvas;
    //Контекст рисования
    _ctx;
    //Соотношенеи сторон экрана
    _ascpectRatio;
    //Ширина игрового мира
    _virtualWidth;
    _virtualHeight;
    //Коэфиценты проекции (Мир игры отличается от разрешения) 
    _scaleX;
    _scaleY;
    _debugFont = '13 px serif';
    _smallFont = "10 px serif";
    _middleFont = "bold 20px Arial";
    _bigFont = "20 px serif";
    //--------Конструктор--------
    constructor(canvas, virtualWidth, virtualHeight, window_w, window_h) {
        this._canvas = canvas;
        this._ctx = canvas.getContext("2d");
        this._virtualHeight = virtualHeight;
        this._virtualWidth = virtualWidth;
        this._canvas.height = window_h;
        this._canvas.width = window_w;
        this._ascpectRatio = this._canvas.width / this._canvas.height;
        this._scaleX = this._canvas.width / this._virtualWidth;
        this._scaleY = this._canvas.width / this._virtualWidth;
        this._ctx.imageSmoothingEnabled = true;
        this._ctx.imageSmoothingQuality = "low";
        //this._canvas.ceb
    }
    //--------Свойства--------
    //Ширина экрана
    get WINDOW_WIDTH() {
        return this._canvas.width;
    }
    //Установка ширины экрана
    set WINDOW_WIDTH(width) {
        this._canvas.width = width;
        this._ascpectRatio = this._canvas.width / this._canvas.height;
        this._scaleX = this._canvas.width / this._virtualWidth;
        this._scaleY = this._canvas.width / this._virtualWidth;
    }
    //Высота экрана
    get WINDOW_HEIGHT() {
        return this._canvas.height;
    }
    //Установка высоты экрана
    set WINDOW_HEIGHT(height) {
        this._canvas.height = height;
        this._ascpectRatio = this._canvas.width / this._canvas.height;
    }
    //Высота мира
    get VIRTUAL_HEIGHT() {
        return this._virtualHeight;
    }
    //Ширина мира
    get VIRTUAL_WIDTH() {
        return this._virtualWidth;
    }
    //Соотношение сторон
    get ASPECT_RATIO() {
        return this._ascpectRatio;
    }
    //-------Функции проекции--------
    //Проекция координат
    projectCoords(x, y) {
        return {
            x: x * this._scaleX,
            y: (this._virtualHeight - y) * this._scaleY + this.WINDOW_HEIGHT - (this.WINDOW_WIDTH * this._virtualHeight) / this._virtualWidth
        };
    }
    //Проекция размера
    projectSize(w, h) {
        return {
            width: w * this._scaleX,
            height: h * this._scaleY
        };
    }
    //-------Функции отрисовки--------
    //Очистка экрана
    clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
    //Установка шрифта
    setFont(font) {
        this._ctx.font = font;
    }
    //Установка цвета
    setColor(color) {
        this._ctx.fillStyle = color;
    }
    //Вывод текста (без проекции)
    drawMiddleText(text, x, y) {
        let tmpFont = this._ctx.font;
        this.setFont(this._middleFont);
        let coords = this.projectCoords(x, y);
        this._ctx.fillText(text, coords.x, coords.y);
        this.setFont(tmpFont);
    }
    //Вывод дебаг текста (без проекции)
    drawDebugText(text, x, y) {
        let tmpColor = this._ctx.fillStyle;
        let tmpFont = this._ctx.font;
        this.setColor("black");
        this.setFont(this._debugFont);
        this._ctx.fillText(text, x, y);
        this.setColor(tmpColor);
        this.setFont(tmpFont);
    }
    //Отрисовка квадрата (с учетом проекции)
    drawSquare(x, y, w, h, color) {
        let tmpColor = this._ctx.fillStyle;
        this.setColor(color);
        let coords = this.projectCoords(x, y);
        let size = this.projectSize(w, h);
        this._ctx.fillRect(coords.x, coords.y - size.height, size.width, size.height);
        this.setColor(tmpColor);
    }
    drawImageOld(image, x, y) {
        this._ctx.drawImage(image, x, this.WINDOW_HEIGHT - y - image.height);
    }
    drawSpriteOld(sprite, x, y) {
        let coords = this.projectCoords(x, y);
        this._ctx.drawImage(sprite.image, coords.x, coords.y - sprite.height);
    }
    drawSprite(sprite, x, y, w, h) {
        let coords = this.projectCoords(x, y);
        let size = this.projectSize(w, h);
        this._ctx.drawImage(sprite.image, 0, 0, sprite.width, sprite.height, coords.x, coords.y - size.height, size.width, size.height);
    }
    drawActor(actor, debug = false) {
        if (actor.sprite) {
            this.drawSprite(actor.sprite, actor.x, actor.y, actor.hitboxWidht, actor.hitboxHeight);
        }
        if (debug && actor.hitboxColor) {
            this.drawSquare(actor.x, actor.y, actor.hitboxWidht, actor.hitboxWidht, actor.hitboxColor);
        }
    }
    //-------Дебаг информация--------
    drawRenderDebugText() {
        let tmpColor = this._ctx.fillStyle;
        let tmpFont = this._ctx.font;
        this.setColor("black");
        this.setFont(this._debugFont);
        let posy = 20;
        this.drawDebugText(this._virtualWidth.toString() + " x " + this._virtualHeight.toString(), 5, posy);
        posy += 20;
        this.drawDebugText(this.WINDOW_WIDTH.toString() + " x " + this.WINDOW_HEIGHT.toString(), 5, posy);
        this.setColor(tmpColor);
        this.setFont(tmpFont);
    }
}
