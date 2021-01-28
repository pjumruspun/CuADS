import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { IProject } from '../interface/projects.interface';
import { ProjectsService } from './projects.service';
import { Types } from 'mongoose';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
    constructor(private projectsService: ProjectsService) {}

    // Debugging purpose only
    @ApiOperation({ summary: 'Get all projects, for debugging purpose only'})
    @Get()
    async findAll(): Promise<IProject[]> {
        return this.projectsService.findAll();
    }

    @ApiOperation({ summary: 'Find one project by {id}`'})
    @Get('findbyid/:id')
    async findById(@Param('id') id: string): Promise<IProject> {
        return this.projectsService.findById(id);
    }

    @ApiOperation({ summary: 'Get all tracks by {id} (projectId)'})
    @Get('getalltracks/:id')
    async findAllTracks(@Param('id') id: string): Promise<Types.ObjectId[]> {
        return this.projectsService.findAllTracks(id);
    }

    @ApiOperation({ summary: '** NOT RECOMMENDED AS IT MIGHT BREAK THE INTEGRITY OF THE DOCUMENT **'})
    @Post()
    async create(@Body() createProjectDto: CreateProjectDto): Promise<IProject> {
        return this.projectsService.create(createProjectDto);
    }

    @ApiOperation({ summary: 'Create blank project, use this instead of [POST] /projects if you can'})
    @Post('new')
    async createNewProject(): Promise<IProject> {
        return this.projectsService.createNewProject();
    }

    @ApiOperation({ summary: 'Update one project by {id}, intended for ONLY updating passcode or/and videoURL'})
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto): Promise<IProject> {
        return this.projectsService.update(id, updateProjectDto);
    }
}
