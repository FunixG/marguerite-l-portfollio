import {ProjectModule} from "./base-project-module";
import ProjectsMediasService from "../projects-medias-service";

export class ImageAndTextModule extends ProjectModule {

    imageId: string;
    altImage: string;
    text: string;

    constructor(imageId: string = '', altImage: string = '', text: string = '') {
        super('ImageAndTextModule')
        this.imageId = imageId;
        this.altImage = altImage;
        this.text = text;
    }

    getHtml(): string {
        return `<div class="image-and-text"><img src="${ProjectsMediasService.getMediaUrl(this.imageId)}" alt="${this.altImage}" /><p>${this.text}</p></div>`;
    }

    toJsonData(): string {
        return JSON.stringify({
            imageId: this.imageId,
            altImage: this.altImage,
            text: this.text
        });
    }

    static fromJson(data: string): ImageAndTextModule {
        let jsonData = JSON.parse(data);
        return new ImageAndTextModule(jsonData.imageId, jsonData.altImage, jsonData.text);
    }

}