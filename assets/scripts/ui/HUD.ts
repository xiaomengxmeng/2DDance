import { PlayerStats } from '../player/PlayerStats';
import { LevelManager } from '../level/LevelManager';

export class HUD {
    private node: cc.Node;
    private healthBar: cc.ProgressBar;
    private coinLabel: cc.Label;
    private levelLabel: cc.Label;
    private playerStats: PlayerStats;
    private levelManager: LevelManager;
    private coins: number = 0;
    
    constructor(node: cc.Node, playerStats: PlayerStats) {
        this.node = node;
        this.healthBar = node.getChildByName('HealthBar').getComponent(cc.ProgressBar);
        this.coinLabel = node.getChildByName('CoinLabel').getComponent(cc.Label);
        this.levelLabel = node.getChildByName('LevelLabel').getComponent(cc.Label);
        this.playerStats = playerStats;
        this.levelManager = LevelManager.getInstance();
        this.updateUI();
    }
    
    public updateUI() {
        if (this.healthBar) {
            this.healthBar.progress = this.playerStats.getHealth() / this.playerStats.getMaxHealth();
        }
        
        if (this.coinLabel) {
            this.coinLabel.string = `Coins: ${this.coins}`;
        }
        
        if (this.levelLabel) {
            this.levelLabel.string = `Level: ${this.levelManager.getCurrentLevel()}`;
        }
    }
    
    public addCoin() {
        this.coins++;
        this.updateUI();
    }
    
    public getCoins(): number {
        return this.coins;
    }
}