import * as mongoose from 'mongoose';

export const generateObjectID = (): mongoose.Types.ObjectId => {
    return new mongoose.Types.ObjectId();
}