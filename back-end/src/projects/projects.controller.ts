import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProjectDto } from './create-project.dto';
import { Project } from './projects.schema';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    @Get()
    async findAll(): Promise<Project[]> {
        return this.projectsService.findAll();
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto) {
        return this.projectsService.create(createProjectDto);
    }
}
