import {Component} from '@angular/core';
import {ModuleComponent} from "../module.component";
import {ImageAndImageModule} from "../../../../../services/projects/modules/image-and-image-module";
import {ProjectMediaDto, ProjectMediaType} from "../../../../../dtos/projects/project-media-dto";

@Component({
  selector: 'app-admin-image-and-image-module',
  templateUrl: './admin-image-and-image-module.component.html',
  standalone: false
})
export class AdminImageAndImageModuleComponent extends ModuleComponent<ImageAndImageModule> {

  first?: ProjectMediaDto
  second?: ProjectMediaDto

  onLoadedModule(module: ImageAndImageModule): void {
    if (module.firstImageId) {
      this.mediaService.getById(module.firstImageId).subscribe({
        next: (media) => {
          this.first = media;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          alert("Erreur de chargement de l'image : " + err.message)
        }
      })
    }

    if (module.secondImageId) {
      this.mediaService.getById(module.secondImageId).subscribe({
        next: (media) => {
          this.second = media;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          alert("Erreur de chargement de l'image : " + err.message)
        }
      })
    }
  }

  openSelection(first: boolean) {
    if (!this.module) return;

    this.mediaModalService.openModal((media) => {
      if (!media.id || !this.module) return;
      if (media.mediaType !== ProjectMediaType.IMAGE) {
        alert("Veuillez sélectionner une image.")
        return;
      }

      if (first) {
        this.first = media
        this.module.firstImageId = media.id
        this.module.altFirstImage = media.mediaDescription
      } else {
        this.second = media
        this.module.secondImageId = media.id
        this.module.altSecondImage = media.mediaDescription
      }
    })
  }
}
