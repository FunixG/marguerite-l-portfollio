import {ProjectModule} from "./base-project-module";

export class ImageAndTextModule extends ProjectModule {

    imageId: string;
    text: string;

    constructor(imageId: string = '', text: string = '') {
        super('ImageAndTextModule')
        this.imageId = imageId;
        this.text = text;
    }

    getHtml(): string {
        return "";
    }

    toJsonData(): string {
        return JSON.stringify({
            imageId: this.imageId,
            text: this.text
        });
    }

    static fromJson(data: string): ImageAndTextModule {
        let jsonData = JSON.parse(data);
        return new ImageAndTextModule(jsonData.imageId, jsonData.text);
    }

}