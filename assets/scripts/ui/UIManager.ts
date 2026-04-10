export class UIManager {
    private static instance: UIManager;
    private canvas: cc.Node;
    private currentUI: cc.Node = null;
    
    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }
    
    constructor() {
        this.canvas = cc.find('Canvas');
    }
    
    public showUI(prefab: cc.Prefab) {
        if (this.currentUI) {
            this.currentUI.destroy();
        }
        this.currentUI = cc.instantiate(prefab);
        this.canvas.addChild(this.currentUI);
    }
    
    public hideUI() {
        if (this.currentUI) {
            this.currentUI.destroy();
            this.currentUI = null;
        }
    }
    
    public getCurrentUI(): cc.Node {
        return this.currentUI;
    }
}