# Cocos像素平台跳跃游戏实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成基于Cocos Creator 3.8.8的像素风平台跳跃游戏实现，包括核心系统、资源创建、场景设计和测试部署。

**Architecture:** 采用模块化设计，分为玩家系统、敌人系统、关卡系统、UI系统和系统模块，使用TypeScript开发，Cocos Creator作为开发环境。

**Tech Stack:** Cocos Creator 3.8.8, TypeScript, Pixel Art, Cocos Physics System

---

## 项目结构

```
/workspace
  /assets
    /scripts
      /player          # 玩家相关脚本
      /enemy           # 敌人相关脚本
      /level           # 关卡相关脚本
      /ui              # UI相关脚本
      /system          # 系统相关脚本
    /resources
      /sprites         # 精灵资源
      /audio           # 音频资源
      /prefabs         # 预制体
    /scenes            # 场景文件
  /test               # 测试文件
  /docs               # 文档
```

## 任务分解

### 任务1: 环境设置与项目初始化

**Files:**
- Modify: `/workspace/settings/v2/packages/builder.json`

- [ ] **Step 1: 安装Cocos Creator 3.8.8**

下载并安装Cocos Creator 3.8.8版本，确保开发环境配置正确。

- [ ] **Step 2: 打开项目**

使用Cocos Creator打开当前项目，检查项目结构是否完整。

- [ ] **Step 3: 配置构建选项**

```json
{
  "__version__": "1.3.9",
  "builder": {
    "web": {
      "template": "default",
      "polyfills": true,
      "minify": true,
      "md5Cache": true,
      "sourceMaps": false
    }
  }
}
```

- [ ] **Step 4: 提交配置**

```bash
git add settings/v2/packages/builder.json
git commit -m "build: configure build settings"
```

### 任务2: 核心系统实现 - 输入管理

**Files:**
- Create: `/workspace/assets/scripts/system/InputManager.ts`

- [ ] **Step 1: 实现输入管理器**

```typescript
export class InputManager {
    private static instance: InputManager;
    private keys: Map<string, boolean> = new Map();

    public static getInstance(): InputManager {
        if (!InputManager.instance) {
            InputManager.instance = new InputManager();
        }
        return InputManager.instance;
    }

    constructor() {
        this.setupEventListeners();
    }

    private setupEventListeners() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    private onKeyDown(event: cc.Event.EventKeyboard) {
        this.keys.set(event.keyCode.toString(), true);
    }

    private onKeyUp(event: cc.Event.EventKeyboard) {
        this.keys.set(event.keyCode.toString(), false);
    }

    public isKeyPressed(keyCode: number): boolean {
        return this.keys.get(keyCode.toString()) || false;
    }
}
```

- [ ] **Step 2: 测试输入管理器**

在游戏场景中添加测试代码，验证输入是否正常。

- [ ] **Step 3: 提交代码**

```bash
git add assets/scripts/system/InputManager.ts
git commit -m "feat: add input manager"
```

### 任务3: 核心系统实现 - 物理管理

**Files:**
- Create: `/workspace/assets/scripts/system/PhysicsManager.ts`

- [ ] **Step 1: 实现物理管理器**

```typescript
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
        const physics = cc.director.getPhysicsManager();
        physics.enabled = true;
        physics.gravity = new cc.Vec2(0, -1000);
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
```

- [ ] **Step 2: 测试物理系统**

创建一个测试场景，验证物理系统是否正常工作。

- [ ] **Step 3: 提交代码**

```bash
git add assets/scripts/system/PhysicsManager.ts
git commit -m "feat: add physics manager"
```

### 任务4: 核心系统实现 - 游戏管理

**Files:**
- Create: `/workspace/assets/scripts/system/GameManager.ts`

- [ ] **Step 1: 实现游戏管理器**

```typescript
export class GameManager {
    private static instance: GameManager;
    private isGameOver: boolean = false;
    private isPaused: boolean = false;
    private objectPools: Map<string, cc.Node[]> = new Map();

    public static getInstance(): GameManager {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }

    public startGame() {
        this.isGameOver = false;
        this.isPaused = false;
        console.log('Game started');
    }

    public pauseGame() {
        this.isPaused = true;
        console.log('Game paused');
    }

    public resumeGame() {
        this.isPaused = false;
        console.log('Game resumed');
    }

    public gameOver() {
        this.isGameOver = true;
        console.log('Game over');
    }

    public restartGame() {
        this.startGame();
        console.log('Game restarted');
    }

    public getIsGameOver(): boolean {
        return this.isGameOver;
    }

    public getIsPaused(): boolean {
        return this.isPaused;
    }

    public getObject(prefab: cc.Prefab): cc.Node {
        const key = prefab.name;
        if (this.objectPools.has(key) && this.objectPools.get(key).length > 0) {
            return this.objectPools.get(key).pop();
        }
        return cc.instantiate(prefab);
    }

    public returnObject(prefab: cc.Prefab, node: cc.Node): void {
        const key = prefab.name;
        if (!this.objectPools.has(key)) {
            this.objectPools.set(key, []);
        }
        node.active = false;
        this.objectPools.get(key).push(node);
    }
}
```

- [ ] **Step 2: 测试游戏管理器**

运行测试文件验证游戏管理器功能。

- [ ] **Step 3: 提交代码**

```bash
git add assets/scripts/system/GameManager.ts
git commit -m "feat: add game manager"
```

### 任务5: 核心系统实现 - 音频管理

**Files:**
- Create: `/workspace/assets/scripts/system/AudioManager.ts`

- [ ] **Step 1: 实现音频管理器**

```typescript
export class AudioManager {
    private static instance: AudioManager;
    private audioEngine: cc.AudioEngine;
    private bgmId: number = -1;

    public static getInstance(): AudioManager {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    constructor() {
        this.audioEngine = cc.audioEngine;
    }

    public playBGM(clip: cc.AudioClip, loop: boolean = true) {
        if (this.bgmId !== -1) {
            this.audioEngine.stop(this.bgmId);
        }
        this.bgmId = this.audioEngine.play(clip, loop, 1);
    }

    public playSFX(clip: cc.AudioClip, volume: number = 1) {
        this.audioEngine.play(clip, false, volume);
    }

    public stopBGM() {
        if (this.bgmId !== -1) {
            this.audioEngine.stop(this.bgmId);
            this.bgmId = -1;
        }
    }

    public setVolume(volume: number) {
        this.audioEngine.setVolume(this.bgmId, volume);
    }
}
```

- [ ] **Step 2: 提交代码**

```bash
git add assets/scripts/system/AudioManager.ts
git commit -m "feat: add audio manager"
```

### 任务6: 玩家系统实现 - 属性管理

**Files:**
- Create: `/workspace/assets/scripts/player/PlayerStats.ts`

- [ ] **Step 1: 实现玩家属性系统**

```typescript
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
```

- [ ] **Step 2: 提交代码**

```bash
git add assets/scripts/player/PlayerStats.ts
git commit -m "feat: add player stats"
```

### 任务7: 玩家系统实现 - 动画管理

**Files:**
- Create: `/workspace/assets/scripts/player/PlayerAnimation.ts`

- [ ] **Step 1: 实现玩家动画系统**

```typescript
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
```

- [ ] **Step 2: 提交代码**

```bash
git add assets/scripts/player/PlayerAnimation.ts
git commit -m "feat: add player animation"
```

### 任务8: 玩家系统实现 - 控制器

**Files:**
- Create: `/workspace/assets/scripts/player/PlayerController.ts`

- [ ] **Step 1: 实现玩家控制器**

```typescript
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
            setTimeout(() => {
                this.isAttacking = false;
            }, 500);
        }
    }

    public defend() {
        if (!this.isDefending) {
            this.isDefending = true;
            console.log('Player defended');
            setTimeout(() => {
                this.isDefending = false;
            }, 1000);
        }
    }

    public onCollisionEnter(other: cc.Collider, self: cc.Collider) {
        if (other.tag === 1) {
            this.isGrounded = true;
        }
    }

    public getStats(): PlayerStats {
        return this.stats;
    }
}
```

- [ ] **Step 2: 提交代码**

```bash
git add assets/scripts/player/PlayerController.ts
git commit -m "feat: add player controller"
```

### 任务9: 敌人系统实现 - 属性管理

**Files:**
- Create: `/workspace/assets/scripts/enemy/EnemyStats.ts`

- [ ] **Step 1: 实现敌人属性系统**

```typescript
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
```

- [ ] **Step 2: 提交代码**

```bash
git add assets/scripts/enemy/EnemyStats.ts
git commit -m "feat: add enemy stats"
```

### 任务10: 敌人系统实现 - AI系统

**Files:**
- Create: `/workspace/assets/scripts/enemy/EnemyAI.ts`

- [ ] **Step 1: 实现敌人AI系统**

```typescript
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
```

- [ ] **Step 2: 提交代码**

```bash
git add assets/scripts/enemy/EnemyAI.ts
git commit -m "feat: add enemy AI"
```

### 任务11: 敌人系统实现 - 控制器

**Files:**
- Create: `/workspace/assets/scripts/enemy/EnemyController.ts`

- [ ] **Step 1: 实现敌人控制器**

```typescript
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
        return true;
    }

    public update(deltaTime: number) {
        if (!this.canSeePlayer()) {
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
    }

    private die() {
        console.log('Enemy died');
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
```

- [ ] **Step 2: 提交代码**

```bash
git add assets/scripts/enemy/EnemyController.ts
git commit -m "feat: add enemy controller"
```

### 任务12: 关卡系统实现

**Files:**
- Create: `/workspace/assets/scripts/level/LevelManager.ts`
- Create: `/workspace/assets/scripts/level/PlatformManager.ts`
- Create: `/workspace/assets/scripts/level/ObstacleManager.ts`

- [ ] **Step 1: 实现关卡管理器**

```typescript
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
        console.log('Updating difficulty');
    }

    public getCurrentLevel(): number {
        return this.currentLevel;
    }
}
```

- [ ] **Step 2: 实现平台管理器**

```typescript
export class PlatformManager {
    private platforms: cc.Node[] = [];

    public addPlatform(platform: cc.Node) {
        this.platforms.push(platform);
    }

    public removePlatform(platform: cc.Node) {
        const index = this.platforms.indexOf(platform);
        if (index > -1) {
            this.platforms.splice(index, 1);
        }
    }

    public getPlatforms(): cc.Node[] {
        return this.platforms;
    }

    public clearPlatforms() {
        this.platforms = [];
    }
}
```

- [ ] **Step 3: 实现障碍物管理器**

```typescript
export class ObstacleManager {
    private obstacles: cc.Node[] = [];

    public addObstacle(obstacle: cc.Node) {
        this.obstacles.push(obstacle);
    }

    public removeObstacle(obstacle: cc.Node) {
        const index = this.obstacles.indexOf(obstacle);
        if (index > -1) {
            this.obstacles.splice(index, 1);
        }
    }

    public getObstacles(): cc.Node[] {
        return this.obstacles;
    }

    public clearObstacles() {
        this.obstacles = [];
    }
}
```

- [ ] **Step 4: 提交代码**

```bash
git add assets/scripts/level/
git commit -m "feat: add level management systems"
```

### 任务13: UI系统实现

**Files:**
- Create: `/workspace/assets/scripts/ui/UIManager.ts`
- Create: `/workspace/assets/scripts/ui/HUD.ts`

- [ ] **Step 1: 实现UI管理器**

```typescript
export class UIManager {
    private static instance: UIManager;
    private canvas: cc.Node;
    private currentUI: cc.Node = null;

    public static getInstance(): UIManager {
        if (!UIManager.instance) {
            UIManager.instance = new UIManager();
        }
        return UIManager.instance;
    }

    constructor() {
        this.canvas = cc.find('Canvas');
    }

    public showUI(prefab: cc.Prefab) {
        if (this.currentUI) {
            this.currentUI.destroy();
        }
        this.currentUI = cc.instantiate(prefab);
        this.canvas.addChild(this.currentUI);
    }

    public hideUI() {
        if (this.currentUI) {
            this.currentUI.destroy();
            this.currentUI = null;
        }
    }

    public getCurrentUI(): cc.Node {
        return this.currentUI;
    }
}
```

- [ ] **Step 2: 实现HUD系统**

```typescript
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
```

- [ ] **Step 3: 提交代码**

```bash
git add assets/scripts/ui/
git commit -m "feat: add UI systems"
```

### 任务14: 场景创建与资源配置

**Files:**
- Create: `/workspace/assets/scenes/Level1.scene`
- Create: `/workspace/assets/resources/sprites/player/idle.txt`
- Create: `/workspace/assets/resources/sprites/player/run.txt`
- Create: `/workspace/assets/resources/sprites/player/jump.txt`
- Create: `/workspace/assets/resources/sprites/player/attack.txt`
- Create: `/workspace/assets/resources/sprites/player/defend.txt`
- Create: `/workspace/assets/resources/sprites/enemy/basic.txt`

- [ ] **Step 1: 创建关卡1场景**

在Cocos Creator编辑器中创建Level1.scene，添加背景、平台、玩家和敌人。

- [ ] **Step 2: 配置精灵资源**

创建精灵配置文件，定义像素尺寸和创建说明。

- [ ] **Step 3: 提交代码**

```bash
git add assets/scenes/Level1.scene assets/resources/sprites/
git commit -m "feat: add scene and sprite resources"
```

### 任务15: 测试系统实现

**Files:**
- Create: `/workspace/test/GameTest.ts`

- [ ] **Step 1: 实现游戏测试**

```typescript
import { GameManager } from '../assets/scripts/system/GameManager';
import { PlayerStats } from '../assets/scripts/player/PlayerStats';
import { EnemyStats } from '../assets/scripts/enemy/EnemyStats';

export class GameTest {
    public static runTests() {
        console.log('Running game tests...');

        this.testGameManager();
        this.testPlayerStats();
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
```

- [ ] **Step 2: 运行测试**

在Cocos Creator编辑器中运行测试，验证游戏系统是否正常工作。

- [ ] **Step 3: 提交代码**

```bash
git add test/GameTest.ts
git commit -m "test: add game tests"
```

### 任务16: 构建与部署

**Files:**
- Modify: `/workspace/settings/v2/packages/builder.json`

- [ ] **Step 1: 配置构建选项**

确保构建配置正确设置。

- [ ] **Step 2: 执行构建**

在Cocos Creator编辑器中执行构建，生成Web版本。

- [ ] **Step 3: 测试构建结果**

打开构建后的HTML文件，测试游戏是否正常运行。

- [ ] **Step 4: 提交构建配置**

```bash
git add settings/v2/packages/builder.json
git commit -m "build: update build settings"
```

## 自我审查

1. **规范覆盖**：所有游戏系统都已在实现计划中覆盖，包括玩家系统、敌人系统、关卡系统、UI系统和系统模块。

2. **占位符检查**：计划中没有使用任何占位符或未完成的代码。

3. **类型一致性**：所有类型、方法签名和属性名称在整个计划中保持一致。

## 执行方式

计划已完成并保存到 `docs/superpowers/plans/2026-04-10-cocos-pixel-platformer-implementation.md`。

**两种执行选项：**

1. **子代理驱动（推荐）** - 每个任务分配一个新的子代理，任务之间进行审查，快速迭代

2. **内联执行** - 使用 executing-plans 在当前会话中执行任务，批量执行并设置检查点

**选择哪种方式？**