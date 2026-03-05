import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {ProjectDto} from "../../../../dtos/projects/project-dto";
import ProjectsMediasService from "../../../../services/projects/projects-medias-service";
import ProjectsService from "../../../../services/projects/projects-service";

@Component({
  selector: 'app-admin-project-row',
  templateUrl: './admin-project-row.component.html',
  standalone: false
})
export class AdminProjectRowComponent {

  @Input() project: ProjectDto = new ProjectDto();
  loading: boolean = false;

  constructor(private readonly projectService: ProjectsService,
              private readonly cdRef: ChangeDetectorRef) {}

  getProjectImage(): string {
    return ProjectsMediasService.getMediaUrl(this.project.coverMediaId)
  }

  switchProjectVisibility(): void {
    this.loading = true;

    const request = new ProjectDto();
    request.id = this.project.id;
    request.isVisible = !this.project.isVisible;

    this.projectService.patch(request).subscribe({
        next: (response) => {
          this.loading = false;
          this.project.isVisible = response.isVisible;
          this.cdRef.detectChanges();
        },
        error: (_) => {
          this.loading = false;
          this.cdRef.detectChanges();
          alert('Une erreur est survenue lors de la modification de la visibilité du projet');
        }
    })
  }

  deleteProject(): void {
    if (!this.project.id) return;

    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.')) {
      this.projectService.delete(this.project.id).subscribe({
        next: () => {
          alert('Projet supprimé avec succès');
          globalThis.location.reload()
        },
        error: (_) => {
          alert('Une erreur est survenue lors de la suppression du projet');
        }
      })
    }
  }

}
