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