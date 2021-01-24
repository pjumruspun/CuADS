import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { IProject } from '../interface/projects.interface';

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

    async findOne(id: string): Promise<IProject> {
        return this.projectModel.findById(id);
    }

    async createNewProject(): Promise<IProject> {
        const newProject = new CreateProjectDto;
        newProject.passcode = "";
        newProject.videoURL = "";

        const createdProject = new this.projectModel(newProject);
        return createdProject.save();
    }

    async updateById(id: string, updateProjectDto: UpdateProjectDto) {
        await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
        return await this.projectModel.findById(id);
    }

    async contains(id: string): Promise<boolean> {
        var found: boolean;
        try {
            found = await this.projectModel.findById(id) != null;
            console.log(`Found = ${found}`);
        } catch {
            found = false;
        }
        return found;
    }

    async createTrack(projectId: string, trackId: string) {
        var id: Types.ObjectId = Types.ObjectId(trackId);
        var updateProjectDto = await this.projectModel.findById(projectId);
        console.log(updateProjectDto);
        updateProjectDto.tracks.push(id);
        await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto);
    }
}
