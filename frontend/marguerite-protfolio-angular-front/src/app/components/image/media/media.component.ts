import {Component, Input} from '@angular/core';
import {ProjectMediaDto, ProjectMediaType} from "../../../../dtos/projects/project-media-dto";
import ProjectsMediasService from "../../../../services/projects/projects-medias-service";

@Component({
  selector: 'app-media',
  imports: [],
  templateUrl: './media.component.html',
  styleUrl: './media.component.css'
})
export class MediaComponent {

  @Input() media: ProjectMediaDto = new ProjectMediaDto();
  mediaTypes = ProjectMediaType;

  constructor(protected readonly mediasService: ProjectsMediasService) {
  }

}
