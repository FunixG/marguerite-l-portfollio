import {ProjectModule} from "./base-project-module";

export class TextAndImageModule extends ProjectModule {

    imageId: string;
    text: string;

    constructor(imageId: string = '', text: string = '') {
        super('TextAndImageModule')
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

    static fromJson(data: string): TextAndImageModule {
        let jsonData = JSON.parse(data);
        return new TextAndImageModule(jsonData.imageId, jsonData.text);
    }

}