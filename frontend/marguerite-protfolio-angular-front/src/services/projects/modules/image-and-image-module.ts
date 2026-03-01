import {ProjectModule} from "./base-project-module";

export class ImageAndImageModule extends ProjectModule {

    firstImageId: string;
    secondImageId: string;

    constructor(firstImageId: string = '', secondImageId: string = '') {
        super('ImageAndImageModule')
        this.firstImageId = firstImageId;
        this.secondImageId = secondImageId;
    }

    getHtml(): string {
        return "";
    }

    toJsonData(): string {
        return JSON.stringify({
            firstImageId: this.firstImageId,
            secondImageId: this.secondImageId
        });
    }

    static fromJson(data: string): ImageAndImageModule {
        let jsonData = JSON.parse(data);
        return new ImageAndImageModule(jsonData.firstImageId, jsonData.secondImageId);
    }

}