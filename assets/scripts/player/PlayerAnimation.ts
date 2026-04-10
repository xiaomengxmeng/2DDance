export class PlayerAnimation {
    private animator: cc.Animation;
    private currentState: string = 'idle';
    
    constructor(node: cc.Node) {
        this.animator = node.getComponent(cc.Animation);
    }
    
    public playIdle() {
        if (this.currentState !== 'idle') {
            this.animator.play('idle');
            this.currentState = 'idle';
        }
    }
    
    public playRun() {
        if (this.currentState !== 'run') {
            this.animator.play('run');
            this.currentState = 'run';
        }
    }
    
    public playJump() {
        if (this.currentState !== 'jump') {
            this.animator.play('jump');
            this.currentState = 'jump';
        }
    }
    
    public playAttack() {
        this.animator.play('attack');
        this.currentState = 'attack';
    }
    
    public playDefend() {
        this.animator.play('defend');
        this.currentState = 'defend';
    }
    
    public playHurt() {
        this.animator.play('hurt');
        this.currentState = 'hurt';
    }
    
    public playDeath() {
        this.animator.play('death');
        this.currentState = 'death';
    }
}