import { EnemyStats } from './EnemyStats';
import { EnemyAI, EnemyState } from './EnemyAI';

export class EnemyController {
    private node: cc.Node;
    private rigidBody: cc.RigidBody;
    private stats: EnemyStats;
    private ai: EnemyAI;
    private playerNode: cc.Node;
    
    constructor(node: cc.Node, playerNode: cc.Node, patrolPoints: cc.Vec2[] = []) {
        this.node = node;
        this.rigidBody = node.getComponent(cc.RigidBody);
        this.stats = new EnemyStats();
        this.ai = new EnemyAI(patrolPoints);
        this.playerNode = playerNode;
    }
    
    private canSeePlayer(): boolean {
        // 实现视野检测逻辑
        return true;
    }
    
    public update(deltaTime: number) {
        if (!this.canSeePlayer()) {
            // 简化AI逻辑
            this.patrol();
            return;
        }
        
        const state = this.ai.update(this.playerNode.position, this.node.position);
        
        switch (state) {
            case EnemyState.PATROL:
                this.patrol();
                break;
            case EnemyState.CHASE:
                this.chase();
                break;
            case EnemyState.ATTACK:
                this.attack();
                break;
            case EnemyState.DEAD:
                this.die();
                break;
        }
    }
    
    private patrol() {
        const nextPoint = this.ai.getNextPatrolPoint();
        if (nextPoint) {
            this.moveTowards(nextPoint);
        }
    }
    
    private chase() {
        this.moveTowards(this.playerNode.position);
    }
    
    private attack() {
        console.log('Enemy attacked');
        // 实现攻击逻辑
    }
    
    private die() {
        console.log('Enemy died');
        // 实现死亡逻辑
        this.node.active = false;
    }
    
    private moveTowards(target: cc.Vec2) {
        const direction = target.sub(this.node.position).normalize();
        const velocity = this.rigidBody.linearVelocity;
        velocity.x = direction.x * this.stats.getSpeed();
        this.rigidBody.linearVelocity = velocity;
    }
    
    public takeDamage(damage: number): number {
        const actualDamage = this.stats.takeDamage(damage);
        if (this.stats.isDead()) {
            this.ai.setDead();
        }
        return actualDamage;
    }
    
    public getStats(): EnemyStats {
        return this.stats;
    }
}