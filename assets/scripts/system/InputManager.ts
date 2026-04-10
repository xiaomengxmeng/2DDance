export class InputManager {
    private static instance: InputManager;
    private keys: Map<string, boolean> = new Map();
    
    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }
    
    constructor() {
        this.setupEventListeners();
    }
    
    private setupEventListeners() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }
    
    private onKeyDown(event: cc.Event.EventKeyboard) {
        this.keys.set(event.keyCode.toString(), true);
    }
    
    private onKeyUp(event: cc.Event.EventKeyboard) {
        this.keys.set(event.keyCode.toString(), false);
    }
    
    public isKeyPressed(keyCode: number): boolean {
        return this.keys.get(keyCode.toString()) || false;
    }
}