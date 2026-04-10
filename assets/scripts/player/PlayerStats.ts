export class PlayerStats {
    private health: number = 100;
    private maxHealth: number = 100;
    private attackPower: number = 20;
    private defense: number = 10;
    private speed: number = 300;
    private jumpForce: number = 500;
    
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
    
    public getJumpForce(): number {
        return this.jumpForce;
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