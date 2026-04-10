export class EnemyStats {
    private health: number;
    private maxHealth: number;
    private attackPower: number;
    private defense: number;
    private speed: number;
    
    constructor(health: number = 50, attackPower: number = 15, defense: number = 5, speed: number = 100) {
        this.health = health;
        this.maxHealth = health;
        this.attackPower = attackPower;
        this.defense = defense;
        this.speed = speed;
    }
    
    public getHealth(): number {
        return this.health;
    }
    
    public setHealth(value: number) {
        this.health = Math.max(0, Math.min(value, this.maxHealth));
    }
    
    public getMaxHealth(): number {
        return this.maxHealth;
    }
    
    public getAttackPower(): number {
        return this.attackPower;
    }
    
    public getDefense(): number {
        return this.defense;
    }
    
    public getSpeed(): number {
        return this.speed;
    }
    
    public takeDamage(damage: number): number {
        const actualDamage = Math.max(0, damage - this.defense);
        this.setHealth(this.health - actualDamage);
        return actualDamage;
    }
    
    public isDead(): boolean {
        return this.health <= 0;
    }
}