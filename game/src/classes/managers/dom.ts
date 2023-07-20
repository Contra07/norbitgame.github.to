export class DOManager {
    public static isStartButton: boolean = false
    public static isEndButton: boolean = false
    public static isExitButton: boolean = false

    public static hide(el: HTMLElement){
        el.style.display = 'none';
        el.style.visibility = "hidden"
    }

    public static show(el: HTMLElement){
        el.style.display = 'block';
        el.style.visibility = "visible"
    }
}