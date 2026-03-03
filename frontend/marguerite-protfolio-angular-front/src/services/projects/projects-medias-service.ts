import {StorageCrudHttpClient} from "../../lib/requests/storage-crud-http-client";
import {ProjectMediaDto} from "../../dtos/projects/project-media-dto";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export default class ProjectsMediasService extends StorageCrudHttpClient<ProjectMediaDto> {

    constructor(http: HttpClient) {
        super(http, environment.apiUrl, '/projects/media');
    }

    getMediaUrl(media: ProjectMediaDto): string {
        return environment.apiUrl + '/projects/media/file/' + media.id;
    }

}
