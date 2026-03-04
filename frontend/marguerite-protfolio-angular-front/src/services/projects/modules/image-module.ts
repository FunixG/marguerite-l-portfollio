import {ProjectModule} from "./base-project-module";
import ProjectsMediasService from "../projects-medias-service";

export class ImageModule extends ProjectModule {

    imageId: string;
    altImage: string;

    constructor(imageId: string = '', altImage: string = '') {
        super('ImageModule')
        this.imageId = imageId;
        this.altImage = altImage;
    }

    getHtml(): string {
        return `<div class="image-module"><img src="${ProjectsMediasService.getMediaUrl(this.imageId)}" alt="${this.altImage}" /></div>`;
    }

    toJsonData(): string {
        return JSON.stringify({
            imageId: this.imageId,
            altImage: this.altImage
        });
    }

    static fromJson(data: string): ImageModule {
        let jsonData = JSON.parse(data);
        return new ImageModule(jsonData.imageId, jsonData.altImage);
    }

}
