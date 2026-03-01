import {Component} from '@angular/core';
import {ModuleComponent} from "../module.component";
import {ImageAndTextModule} from "../../../../../services/projects/modules/image-and-text-module";

@Component({
  selector: 'app-admin-image-and-text-module',
  templateUrl: './admin-image-and-text-module.component.html',
  standalone: false
})
export class AdminImageAndTextModuleComponent extends ModuleComponent<ImageAndTextModule> {

}
