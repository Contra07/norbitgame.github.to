export class KeyManager {
    keys;
    constructor() {
        this.keys = new Map();
    }
    press(key) {
        this.keys.set(key, true);
    }
    wasPressed(key) {
        return this.keys.has(key) && this.keys.get(key);
    }
    clear() {
        this.keys.clear();
    }
}
