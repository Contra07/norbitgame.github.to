export class KeyManager{
    private keys: Map<string, boolean>

    constructor(){
        this.keys = new Map()
    }

    public press(key: string):void {
        this.keys.set(key,true)
    }

    public wasPressed(key: string): boolean{ 
        return this.keys.has(key) && <boolean>this.keys.get(key)
    }

    public clear(){
        this.keys.clear()
    }
}