import {Component} from '@angular/core';
import ProjectsService from "../../../../services/projects/projects-service";
import AdminProjectMediasManagerService from "../../admin-project-medias-manager/admin-project-medias-manager.service";

@Component({
  selector: 'app-project-cover-image',
  templateUrl: './project-cover-image.component.html',
  standalone: false
})
export class ProjectCoverImageComponent {

  constructor(protected readonly projectsService: ProjectsService,
              private readonly modalService: AdminProjectMediasManagerService) {
  }

  openMediaSelector() {
    this.modalService.openModal()
  }

}
