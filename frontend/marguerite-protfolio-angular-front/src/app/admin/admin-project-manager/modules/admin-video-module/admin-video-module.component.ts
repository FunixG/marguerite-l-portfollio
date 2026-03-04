import {Component} from '@angular/core';
import {ModuleComponent} from "../module.component";
import {VideoModule} from "../../../../../services/projects/modules/video-module";
import {ProjectMediaDto, ProjectMediaType} from "../../../../../dtos/projects/project-media-dto";

@Component({
  selector: 'app-admin-video-module',
  templateUrl: './admin-video-module.component.html',
  standalone: false
})
export class AdminVideoModuleComponent extends ModuleComponent<VideoModule> {

  video?: ProjectMediaDto

  onLoadedModule(module: VideoModule): void {
    if (module.videoId) {
      this.mediaService.getById(module.videoId).subscribe({
        next: (media) => {
          this.video = media;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          alert("Erreur de chargement de la vidéo : " + err.message)
        }
      })
    }
  }

  openVideoSelection() {
    if (!this.module) return;

    this.mediaModalService.openModal((media) => {
      if (!media.id || !this.module) return;
      if (media.mediaType !== ProjectMediaType.VIDEO) {
        alert("Veuillez sélectionner une vidéo.")
        return;
      }

      this.video = media
      this.module.videoId = media.id
    })
  }

}
