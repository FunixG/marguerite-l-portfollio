import {ProjectModule} from "./base-project-module";
import ProjectsMediasService from "../projects-medias-service";

export class ImageAndImageModule extends ProjectModule {

    firstImageId: string;
    altFirstImage: string;

    secondImageId: string;
    altSecondImage: string;

    constructor(firstImageId: string = '', altFirstImage: string = '', secondImageId: string = '', altSecondImage: string = '') {
        super('ImageAndImageModule')
        this.firstImageId = firstImageId;
        this.altFirstImage = altFirstImage;
        this.secondImageId = secondImageId;
        this.altSecondImage = altSecondImage;
    }

    getHtml(): string {
        return `<div class="image-and-image"><img src="${ProjectsMediasService.getMediaUrl(this.firstImageId)}" alt="${this.altFirstImage}" /><img src="${ProjectsMediasService.getMediaUrl(this.secondImageId)}" alt="${this.altSecondImage}" /></div>`;
    }

    toJsonData(): string {
        return JSON.stringify({
            firstImageId: this.firstImageId,
            altFirstImage: this.altFirstImage,
            secondImageId: this.secondImageId,
            altSecondImage: this.altSecondImage
        });
    }

    static fromJson(data: string): ImageAndImageModule {
        let jsonData = JSON.parse(data);
        return new ImageAndImageModule(jsonData.firstImageId, jsonData.altFirstImage, jsonData.secondImageId, jsonData.altSecondImage);
    }

}