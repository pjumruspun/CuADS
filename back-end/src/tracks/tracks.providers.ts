import { Connection } from 'mongoose';
import { TrackSchema } from './tracks.schema';

export const trackProviders = [
    {
        provide: 'TRACK_MODEL',
        useFactory: (connection: Connection) => connection.model('Track', TrackSchema),
        inject: ['DATABASE_CONNECTION'],
    }
]