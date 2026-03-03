import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import ProjectsMediasService from "../../../services/projects/projects-medias-service";
import {ProjectMediaDto} from "../../../dtos/projects/project-media-dto";
import {PageOption} from "../../../lib/dtos/page-dto";
import {QueryBuilder} from "../../../lib/query-builder";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-admin-project-medias-manager',
  templateUrl: './admin-project-medias-manager.component.html',
  styleUrl: './admin-project-medias-manager.component.css',
  standalone: false
})
export class AdminProjectMediasManagerComponent implements OnInit {

  loading = true;
  medias: ProjectMediaDto[] = [];
  private page = 0;
  private noMoreMedias = false;

  @Output() closed = new EventEmitter<void>();
  @Output() mediaSelected = new EventEmitter<string>();

  constructor(private readonly mediasService: ProjectsMediasService) {
  }

  onClose(): void {
    this.closed.emit();
  }

  ngOnInit(): void {
    this.load();
  }

  @HostListener('window:scroll') onScroll(e: Event): void {
    console.log(e)
  }

  loadNextPage(): void {
    if (this.noMoreMedias) {
      return;
    }

    this.page++;
    this.load();
  }

  getMediaUrl(media: ProjectMediaDto): string {
    return environment.apiUrl + '/projects/media/file/' + media.id;
  }

  onDeleteMedia(media: ProjectMediaDto): void {
    if (!media.id) {
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) {
      return;
    }

    this.mediasService.delete(media.id).subscribe({
      next: () => {
        this.medias = this.medias.filter(m => m.id !== media.id);
      },
      error: (err) => {
        alert('Une erreur est survenue lors de la suppression du média : ' + err.message);
      }
    })
  }

  private load(): void {
    this.loading = true;

    const pageOptions = new PageOption();
    pageOptions.page = this.page;
    pageOptions.elemsPerPage = 10;
    pageOptions.sort = 'createdAt:desc';

    this.mediasService.find(pageOptions, new QueryBuilder()).subscribe({
      next: (medias) => {
        this.medias = medias.content;
        this.noMoreMedias = medias.totalPages < this.page;
        this.loading = false;
      },
      error: (err) => {
        alert('Une erreur est survenue lors du chargement des médias : ' + err.message);
        this.loading = false;
      }
    })
  }

}
