import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseModule } from 'src/database/database.module';
import { trackProviders } from 'src/tracks/tracks.providers';
import { ProjectsController } from './projects.controller';
import { projectProviders } from './projects.providers';
import { ProjectSchema } from './projects.schema';
import { ProjectsService } from './projects.service';

@Module({
    imports: [
        DatabaseModule,
        MongooseModule.forFeature([{ name: 'Project', schema: ProjectSchema }]),
    ],
    controllers: [ProjectsController],
    providers: [
        ProjectsService,
        ...trackProviders,
        ...projectProviders,
    ],
})
export class ProjectsModule {}
