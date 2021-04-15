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
        const allProjects = await this.projectModel.findById(projectId)
        if(allProjects)
        {
            return (await this.projectModel.findById(projectId)).tracks;
        }
        else return [];
    }

    async createNewProject(createProjectDto: CreateProjectDto): Promise<IProject> {
        const newProject = new CreateProjectDto;
        newProject.name = createProjectDto.name;
        newProject.passcode = "";
        newProject.videoURL = "";

        const createdProject = new this.projectModel(newProject);
        return createdProject.save();
    }

    async update(id: string, updateProjectDto: UpdateProjectDto) {
        return await this.projectModel.findByIdAndUpdate(id, updateProjectDto, { new: true });
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

    async addTrack(projectId: string, trackId: string) {
        var id: Types.ObjectId = Types.ObjectId(trackId);
        var updateProjectDto = await this.projectModel.findById(projectId);
        updateProjectDto.tracks.push(id);
        await this.projectModel.findByIdAndUpdate(projectId, updateProjectDto);
    }

    async removeTrack(trackId: string): Promise<boolean> {
        var allProjects = await this.findAll() // Very heavy, could optimize later
        var updateProject;
        var found: boolean = false;
        allProjects.forEach((project, i) => {
            project.tracks.forEach(iterTrackId => {
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

    async delete(id: string): Promise<IProject> {
        return await this.projectModel.findByIdAndDelete(id);
    }
}
