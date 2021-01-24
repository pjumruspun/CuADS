export interface IAudioClip {
    readonly content: string;
    readonly startTime: string;
    readonly volume: number;
    readonly speed: number;
    readonly pitch: number;
    readonly audioFileURL: string;
}