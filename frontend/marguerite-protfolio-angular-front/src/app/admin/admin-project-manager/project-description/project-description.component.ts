import {Component} from '@angular/core';
import ProjectsService from "../../../../services/projects/projects-service";

@Component({
  selector: 'app-project-description',
  templateUrl: './project-description.component.html',
  standalone: false
})
export class ProjectDescriptionComponent {

  constructor(protected readonly projectsService: ProjectsService) {
  }

}
