import {Component} from '@angular/core';
import {TextProjectModule} from "../../../../../services/projects/modules/text-project-module";
import {ModuleComponent} from "../module.component";

@Component({
  selector: 'app-admin-text-module',
  templateUrl: './admin-text-module.component.html',
  standalone: false
})
export class AdminTextModuleComponent extends ModuleComponent<TextProjectModule> {

}
