import {ProjectModule} from "./base-project-module";
import ProjectsMediasService from "../projects-medias-service";

export class TextAndImageModule extends ProjectModule {

    imageId: string;
    altImage: string;
    text: string;

    constructor(imageId: string = '', altImage: string = '', text: string = '') {
        super('TextAndImageModule')
        this.imageId = imageId;
        this.altImage = altImage;
        this.text = text;
    }

    getHtml(): string {
        return `<div class="text-and-image"><p>${this.text}</p><img src="${ProjectsMediasService.getMediaUrl(this.imageId)}" alt="${this.altImage}" /></div>`;
    }

    toJsonData(): string {
        return JSON.stringify({
            imageId: this.imageId,
            altImage: this.altImage,
            text: this.text
        });
    }

    static fromJson(data: string): TextAndImageModule {
        let jsonData = JSON.parse(data);
        return new TextAndImageModule(jsonData.imageId, jsonData.altImage, jsonData.text);
    }

}