export class PhysicsManager {
    private static instance: PhysicsManager;
    
    public static getInstance(): PhysicsManager {
        if (!PhysicsManager.instance) {
            PhysicsManager.instance = new PhysicsManager();
        }
        return PhysicsManager.instance;
    }
    
    constructor() {
        this.setupPhysics();
    }
    
    private setupPhysics() {
        // 配置物理世界
        const physics = cc.director.getPhysicsManager();
        physics.enabled = true;
        physics.gravity = new cc.Vec2(0, -1000);
        
        // 调试模式
        // physics.debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit | cc.PhysicsManager.DrawBits.e_pairBit | cc.PhysicsManager.DrawBits.e_centerOfMassBit;
    }
    
    public setGravity(gravity: cc.Vec2) {
        const physics = cc.director.getPhysicsManager();
        physics.gravity = gravity;
    }
    
    public enablePhysics(enabled: boolean) {
        const physics = cc.director.getPhysicsManager();
        physics.enabled = enabled;
    }
}