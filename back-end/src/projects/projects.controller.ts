import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
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

    @Post('new')
    async createNewProject() {
        return this.projectsService.createNewProject();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
        return this.projectsService.updateById(id, updateProjectDto);
    }
}
