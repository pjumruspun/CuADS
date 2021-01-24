import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ITrack } from 'src/interface/tracks.interface';
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

    async findById(id: string): Promise<IProject> {
        return this.projectModel.findById(id);
    }

    async findAllTracks(projectId: string): Promise<Types.ObjectId[]> {
        return (await this.projectModel.findById(projectId)).tracks;
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
        } catch {
            found = false;
        }
        return found;
    }

    async createTrack(projectId: string, trackId: string) {
        var id: Types.ObjectId = Types.ObjectId(trackId);
        var updateProjectDto = await this.projectModel.findById(projectId);
        updateProjectDto.tracks.push(id);
        await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto);
    }

    async deleteTrack(trackId: string): Promise<boolean> {
        var allProjects = await this.findAll()
        var updateProject;
        var found: boolean = false;
        allProjects.forEach((project, i) => {
            project.tracks.forEach((iterTrackId, i) => {
                if(String(iterTrackId) == trackId){
                    found = true;
                    updateProject = project;
                }
            });
        });

        if(found) {
            updateProject.tracks = updateProject.tracks.filter(item => item != String(trackId));
            await this.projectModel.findByIdAndUpdate(updateProject._id, updateProject);
        }

        return found;
    }
}
