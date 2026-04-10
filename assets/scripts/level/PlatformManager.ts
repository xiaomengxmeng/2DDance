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