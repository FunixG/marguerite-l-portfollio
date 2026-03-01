import {Component} from '@angular/core';
import {ModuleComponent} from "../module.component";
import {ImageAndImageModule} from "../../../../../services/projects/modules/image-and-image-module";

@Component({
  selector: 'app-admin-image-and-image-module',
  templateUrl: './admin-image-and-image-module.component.html',
  standalone: false
})
export class AdminImageAndImageModuleComponent extends ModuleComponent<ImageAndImageModule> {

}
