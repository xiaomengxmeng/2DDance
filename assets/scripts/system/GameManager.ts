export class GameManager {
    private static instance: GameManager;
    private isGameOver: boolean = false;
    private isPaused: boolean = false;
    private objectPools: Map<string, cc.Node[]> = new Map();
    
    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    
    public startGame() {
        this.isGameOver = false;
        this.isPaused = false;
        console.log('Game started');
    }
    
    public pauseGame() {
        this.isPaused = true;
        console.log('Game paused');
    }
    
    public resumeGame() {
        this.isPaused = false;
        console.log('Game resumed');
    }
    
    public gameOver() {
        this.isGameOver = true;
        console.log('Game over');
    }
    
    public restartGame() {
        this.startGame();
        console.log('Game restarted');
    }
    
    public getIsGameOver(): boolean {
        return this.isGameOver;
    }
    
    public getIsPaused(): boolean {
        return this.isPaused;
    }
    
    public getObject(prefab: cc.Prefab): cc.Node {
        const key = prefab.name;
        if (this.objectPools.has(key) && this.objectPools.get(key).length > 0) {
            return this.objectPools.get(key).pop();
        }
        return cc.instantiate(prefab);
    }
    
    public returnObject(prefab: cc.Prefab, node: cc.Node): void {
        const key = prefab.name;
        if (!this.objectPools.has(key)) {
            this.objectPools.set(key, []);
        }
        node.active = false;
        this.objectPools.get(key).push(node);
    }
}