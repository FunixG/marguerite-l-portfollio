import {ApiDTO} from "../../lib/dtos/api-dto";

export class ProjectMediaDto extends ApiDTO {
    mediaDescription: string = '';
    mediaType: ProjectMediaType = ProjectMediaType.IMAGE;
}

export enum ProjectMediaType {
    IMAGE = 'IMAGE',
    VIDEO = 'VIDEO'
}
