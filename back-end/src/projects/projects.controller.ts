import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interface/projects.interface';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    // Debugging purpose only
    @Get()
    async findAll(): Promise<IProject[]> {
        return this.projectsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<IProject> {
        return this.projectsService.findOne(id);
    }

    @Post()
    async create(@Body() createProjectDto: CreateProjectDto): Promise<IProject> {
        return this.projectsService.create(createProjectDto);
    }

    @Post('new')
    async createNewProject(): Promise<IProject> {
        return this.projectsService.createNewProject();
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<IProject> {
        return this.projectsService.updateById(id, updateProjectDto);
    }

    @Post('tracks/:id')
    async createTrack(@Param('id') projectId: string, @Body() createTrackDto: CreateTrackDto) {
        return this.projectsService.createTrack(projectId, createTrackDto);
    }
}
