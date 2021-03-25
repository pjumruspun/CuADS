import * as mongoose from 'mongoose';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect(
            `mongodb://${process.env.MONGO_SERVICE_ENDPOINT}:${process.env.MONGO_PORT}/${process.env.MONGO_DATABASE_NAME}`, 
            { useFindAndModify: false }
        ),
    }
];