import { GameManager } from '../system/GameManager';

export class LevelManager {
    private static instance: LevelManager;
    private currentLevel: number = 1;
    private maxLevel: number = 5;
    private gameManager: GameManager;
    
    public static getInstance(): LevelManager {
        if (!LevelManager.instance) {
            LevelManager.instance = new LevelManager();
        }
        return LevelManager.instance;
    }
    
    constructor() {
        this.gameManager = GameManager.getInstance();
    }
    
    public loadLevel(levelId: number) {
        if (levelId >= 1 && levelId <= this.maxLevel) {
            this.currentLevel = levelId;
            console.log(`Loading level ${levelId}`);
            // 实现关卡加载逻辑
        }
    }
    
    public completeLevel() {
        console.log(`Level ${this.currentLevel} completed`);
        if (this.currentLevel < this.maxLevel) {
            this.loadLevel(this.currentLevel + 1);
        } else {
            this.gameManager.gameOver();
            console.log('Game completed!');
        }
    }
    
    public failLevel() {
        console.log(`Level ${this.currentLevel} failed`);
        this.loadLevel(this.currentLevel);
    }
    
    public updateDifficulty() {
        // 实现动态难度调整逻辑
        console.log('Updating difficulty');
    }
    
    public getCurrentLevel(): number {
        return this.currentLevel;
    }
}