import {Component} from '@angular/core';
import ProjectsService from "../../../../services/projects/projects-service";

@Component({
  selector: 'app-project-title',
  templateUrl: './project-title.component.html',
  styleUrl: './project-title.component.css',
  standalone: false
})
export class ProjectTitleComponent {

  constructor(protected readonly projectsService: ProjectsService) {
  }

  titleUpdated() {
    if (!this.projectsService.loadedProject) {
      return;
    }

    const rawTitle = this.projectsService.loadedProject.title || '';

    this.projectsService.loadedProject.path = rawTitle
        .toLowerCase()
        .replaceAll(/[^a-z0-9]+/gi, '-')
        .replaceAll(/^-+|-+$/g, '');
  }

}
