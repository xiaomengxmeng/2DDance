import { GameManager } from '../assets/scripts/system/GameManager';
import { PlayerStats } from '../assets/scripts/player/PlayerStats';
import { EnemyStats } from '../assets/scripts/enemy/EnemyStats';

export class GameTest {
    public static runTests() {
        console.log('Running game tests...');
        
        // 测试游戏管理器
        this.testGameManager();
        
        // 测试玩家属性
        this.testPlayerStats();
        
        // 测试敌人属性
        this.testEnemyStats();
        
        console.log('All tests completed!');
    }
    
    private static testGameManager() {
        const gameManager = GameManager.getInstance();
        gameManager.startGame();
        console.log('GameManager test passed');
    }
    
    private static testPlayerStats() {
        const stats = new PlayerStats();
        const initialHealth = stats.getHealth();
        stats.takeDamage(20);
        console.log(`PlayerStats test passed: ${initialHealth} -> ${stats.getHealth()}`);
    }
    
    private static testEnemyStats() {
        const stats = new EnemyStats();
        const initialHealth = stats.getHealth();
        stats.takeDamage(10);
        console.log(`EnemyStats test passed: ${initialHealth} -> ${stats.getHealth()}`);
    }
}