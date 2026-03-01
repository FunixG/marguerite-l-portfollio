import {ProjectModule} from "./base-project-module";

export class VideoModule extends ProjectModule {

    videoId: string;

    constructor(videoId: string = '') {
        super('VideoModule')
        this.videoId = videoId;
    }

    getHtml(): string {
        return "";
    }

    toJsonData(): string {
        return JSON.stringify({
            videoId: this.videoId
        });
    }

    static fromJson(data: string): VideoModule {
        let jsonData = JSON.parse(data);
        return new VideoModule(jsonData.videoId);
    }

}