import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { IProject } from './interface/projects.interface';

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
        newProject.tracks = [];

        const createdProject = new this.projectModel(newProject);
        return createdProject.save();
    }

    async updateById(id: string, updateProjectDto: UpdateProjectDto) {
        await this.projectModel.findByIdAndUpdate(id, updateProjectDto);
        return await this.projectModel.findById(id);
    }

    async createTrack(projectId: string, createTrackDto: CreateTrackDto) {
        var updateProjectDto: UpdateProjectDto = await this.projectModel.findById(projectId);
        var clips = []; // default audioClips is no clip at all

        if(typeof createTrackDto.audioClips !== 'undefined') {
            // If createdTrack somehow has clips in it
            clips = createTrackDto.audioClips;
        }

        updateProjectDto.tracks.push({
            name: createTrackDto.name,
            audioClips: clips,
        });

        await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto);
        return await this.projectModel.findById(projectId);
    }
}
