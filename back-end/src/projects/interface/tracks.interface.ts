import { IAudioClip } from "./audio-clip.interface";

export interface ITrack {
    readonly name: string;
    readonly audioClips: IAudioClip[];
}