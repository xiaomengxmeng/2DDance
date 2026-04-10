import { InputManager } from '../system/InputManager';
import { PlayerStats } from './PlayerStats';

export class PlayerController {
    private node: cc.Node;
    private rigidBody: cc.RigidBody;
    private stats: PlayerStats;
    private isGrounded: boolean = false;
    private inputManager: InputManager;
    
    constructor(node: cc.Node) {
        this.node = node;
        this.rigidBody = node.getComponent(cc.RigidBody);
        this.stats = new PlayerStats();
        this.inputManager = InputManager.getInstance();
    }
    
    public update(deltaTime: number) {
        if (this.inputManager.isKeyPressed(cc.macro.KEY.left)) {
            this.move(-1);
        } else if (this.inputManager.isKeyPressed(cc.macro.KEY.right)) {
            this.move(1);
        }
        
        if (this.inputManager.isKeyPressed(cc.macro.KEY.up) && this.isGrounded) {
            this.jump();
        }
        
        if (this.inputManager.isKeyPressed(cc.macro.KEY.z)) {
            this.attack();
        }
        
        if (this.inputManager.isKeyPressed(cc.macro.KEY.x)) {
            this.defend();
        }
    }
    
    public move(direction: number) {
        const velocity = this.rigidBody.linearVelocity;
        velocity.x = direction * this.stats.getSpeed();
        this.rigidBody.linearVelocity = velocity;
    }
    
    public jump() {
        const velocity = this.rigidBody.linearVelocity;
        velocity.y = this.stats.getJumpForce();
        this.rigidBody.linearVelocity = velocity;
        this.isGrounded = false;
    }
    
    private isAttacking: boolean = false;
    private isDefending: boolean = false;
    
    public attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            console.log('Player attacked');
            // 实现攻击逻辑
            setTimeout(() => {
                this.isAttacking = false;
            }, 500);
        }
    }
    
    public defend() {
        if (!this.isDefending) {
            this.isDefending = true;
            console.log('Player defended');
            // 实现防御逻辑
            setTimeout(() => {
                this.isDefending = false;
            }, 1000);
        }
    }
    
    public onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag === 1) { // 地面标签
            this.isGrounded = true;
        }
    }
    
    public getStats(): PlayerStats {
        return this.stats;
    }
}