import {Component} from '@angular/core';
import {ModuleComponent} from "../module.component";
import {VideoModule} from "../../../../../services/projects/modules/video-module";

@Component({
  selector: 'app-admin-video-module',
  templateUrl: './admin-video-module.component.html',
  standalone: false
})
export class AdminVideoModuleComponent extends ModuleComponent<VideoModule> {

}
