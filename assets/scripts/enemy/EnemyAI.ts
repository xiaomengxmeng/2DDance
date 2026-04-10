export enum EnemyState {
    IDLE,
    PATROL,
    CHASE,
    ATTACK,
    DEAD
}

export class EnemyAI {
    private currentState: EnemyState = EnemyState.IDLE;
    private patrolPoints: cc.Vec2[] = [];
    private currentPatrolIndex: number = 0;
    private chaseRange: number = 200;
    private attackRange: number = 50;
    
    constructor(patrolPoints: cc.Vec2[] = []) {
        this.patrolPoints = patrolPoints;
    }
    
    public update(playerPosition: cc.Vec2, enemyPosition: cc.Vec2): EnemyState {
        if (this.currentState === EnemyState.DEAD) {
            return this.currentState;
        }
        
        const distance = playerPosition.sub(enemyPosition).mag();
        
        if (distance < this.attackRange) {
            this.currentState = EnemyState.ATTACK;
        } else if (distance < this.chaseRange) {
            this.currentState = EnemyState.CHASE;
        } else {
            this.currentState = EnemyState.PATROL;
        }
        
        return this.currentState;
    }
    
    public getNextPatrolPoint(): cc.Vec2 {
        if (this.patrolPoints.length === 0) {
            return null;
        }
        
        const point = this.patrolPoints[this.currentPatrolIndex];
        this.currentPatrolIndex = (this.currentPatrolIndex + 1) % this.patrolPoints.length;
        return point;
    }
    
    public setDead() {
        this.currentState = EnemyState.DEAD;
    }
    
    public getCurrentState(): EnemyState {
        return this.currentState;
    }
}