export class DOManager {
    static isStartButton = false;
    static isEndButton = false;
    static isExitButton = false;
    static hide(el) {
        el.style.display = 'none';
        el.style.visibility = "hidden";
    }
    static show(el) {
        el.style.display = 'block';
        el.style.visibility = "visible";
    }
}
