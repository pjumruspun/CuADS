import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { IProject } from '../interface/projects.interface';
import { ProjectsService } from './projects.service';
import { Types } from 'mongoose';

@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    // Debugging purpose only
    @Get()
    async findAll(): Promise<IProject[]> {
        return this.projectsService.findAll();
    }

    @Get('findbyid/:id')
    async findById(@Param('id') id: string): Promise<IProject> {
        return this.projectsService.findById(id);
    }

    @Get('getalltracks/:id')
    async findAllTracks(@Param('id') id: string): Promise<Types.ObjectId[]> {
        return this.projectsService.findAllTracks(id);
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
}
