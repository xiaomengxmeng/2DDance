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