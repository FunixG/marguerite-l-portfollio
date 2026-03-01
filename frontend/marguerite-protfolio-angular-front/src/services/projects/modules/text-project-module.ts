import {ProjectModule} from "./base-project-module";

export class TextProjectModule extends ProjectModule {
    text: string;

    constructor(text: string = '') {
        super('TextProjectModule')
        this.text = text;
    }

    getHtml(): string {
        return "<p>" + this.text + "</p>";
    }

    toJsonData(): string {
        return this.text;
    }

    static fromJson(data: string): TextProjectModule {
        return new TextProjectModule(data);
    }

}
