import { Connection } from 'mongoose';
import { TTSSchema } from './tts.schema';

export const ttsProviders = [
    {
        provide: 'TTS_MODEL',
        useFactory: (connection: Connection) => connection.model('TTS', TTSSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]