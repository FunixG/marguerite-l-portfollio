import {Component} from '@angular/core';
import {ModuleComponent} from "../module.component";
import {TextAndImageModule} from "../../../../../services/projects/modules/text-and-image-module";
import {ProjectMediaDto} from "../../../../../dtos/projects/project-media-dto";
import {ImageAndTextModule} from "../../../../../services/projects/modules/image-and-text-module";

@Component({
  selector: 'app-admin-text-and-image-module',
  templateUrl: './admin-text-and-image-module.component.html',
  standalone: false
})
export class AdminTextAndImageModuleComponent extends ModuleComponent<TextAndImageModule> {

  image?: ProjectMediaDto
  text: string = ""

  onLoadedModule(module: ImageAndTextModule): void {
    this.text = module.text || ""

    if (module.imageId) {
      this.mediaService.getById(module.imageId).subscribe({
        next: (media) => {
          this.image = media;
          this.cdRef.detectChanges();
        },
        error: (err) => {
          alert("Erreur de chargement de l'image : " + err.message)
        }
      })
    }
  }

  setText(data: string) {
    this.text = data

    if (this.module) {
      this.module.text = data
    }
  }

  openImageSelection() {
    if (!this.module) return;

    this.mediaModalService.openModal((media) => {
      if (!media.id || !this.module) return;

      this.image = media
      this.module.imageId = media.id
      this.module.altImage = media.mediaDescription
    })
  }

}
