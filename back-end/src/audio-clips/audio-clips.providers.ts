import { Connection } from 'mongoose';
import { AudioClipSchema } from './audio-clips.schema';

export const audioClipsProviders = [
    {
        provide: 'AUDIOCLIP_MODEL',
        useFactory: (connection: Connection) => connection.model('AudioClip', AudioClipSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]