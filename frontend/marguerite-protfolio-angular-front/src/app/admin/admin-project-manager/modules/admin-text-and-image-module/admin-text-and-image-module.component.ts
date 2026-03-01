import {Component} from '@angular/core';
import {ModuleComponent} from "../module.component";
import {TextAndImageModule} from "../../../../../services/projects/modules/text-and-image-module";

@Component({
  selector: 'app-admin-text-and-image-module',
  templateUrl: './admin-text-and-image-module.component.html',
  standalone: false
})
export class AdminTextAndImageModuleComponent extends ModuleComponent<TextAndImageModule> {

}
