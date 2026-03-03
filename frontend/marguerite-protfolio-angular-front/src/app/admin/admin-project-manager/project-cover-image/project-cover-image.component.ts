import {Component, OnInit} from '@angular/core';
import ProjectsService from "../../../../services/projects/projects-service";
import AdminProjectMediasManagerService from "../../admin-project-medias-manager/admin-project-medias-manager.service";
import {ProjectMediaDto, ProjectMediaType} from "../../../../dtos/projects/project-media-dto";
import ProjectsMediasService from "../../../../services/projects/projects-medias-service";

@Component({
  selector: 'app-project-cover-image',
  templateUrl: './project-cover-image.component.html',
  standalone: false
})
export class ProjectCoverImageComponent implements OnInit {

  media?: ProjectMediaDto

  constructor(protected readonly projectsService: ProjectsService,
              protected readonly mediasService: ProjectsMediasService,
              private readonly modalService: AdminProjectMediasManagerService) {
  }

  ngOnInit(): void {
    if (this.projectsService.loadedProject?.coverMediaId) {
      this.mediasService.getById(this.projectsService.loadedProject.coverMediaId).subscribe(media => {
        this.media = media;
      });
    }
  }

  openMediaSelector() {
    this.modalService.openModal((media: ProjectMediaDto) => {
      if (media.mediaType === ProjectMediaType.VIDEO) {
        alert("Veuillez sélectionner une image pour la couverture du projet et non une vidéo.");
      }

      if (this.projectsService.loadedProject && media.id) {
        this.projectsService.loadedProject.coverMediaId = media.id;
        this.media = media;
      }
    });
  }

}
