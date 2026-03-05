import {ApiDTO} from "../../lib/dtos/api-dto";

export class ProjectDto extends ApiDTO {
    title: string = ''
    description: string = ''
    path: string = ''
    isVisible: boolean = true
    htmlCode: string = ''
    jsonCode: string = ''
    coverMediaId: string = ''
}
