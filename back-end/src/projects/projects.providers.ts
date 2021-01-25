import { Connection } from "mongoose";
import { ProjectSchema } from "./projects.schema";

export const projectProviders = [
    {
        provide: 'PROJECT_MODEL',
        useFactory: (connection: Connection) => connection.model('Project', ProjectSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];