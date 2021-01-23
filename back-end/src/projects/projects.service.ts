import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './projects.interface';

@Injectable()
export class ProjectsService {
    constructor(@Inject('PROJECT_MODEL') private projectModel: Model<IProject>){}

    async create(createProjectDto: CreateProjectDto): Promise<IProject> {
        const createdProject = new this.projectModel(createProjectDto);
        return createdProject.save();
    }

    async findAll(): Promise<IProject[]> {
        return this.projectModel.find().exec();
    }

    async createNewProject(): Promise<IProject> {
        const newProject = new CreateProjectDto;
        newProject.passcode = "";
        newProject.videoURL = "";
        newProject.tracks = [];

        const createdProject = new this.projectModel(newProject);
        return createdProject.save();
    }

    async updateById(id: string, updateProjectDto: UpdateProjectDto) {
        await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
        return await this.projectModel.findById(id);
    }
}
