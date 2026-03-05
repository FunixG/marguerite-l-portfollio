import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import ProjectsMediasService from "../../../services/projects/projects-medias-service";
import {ProjectMediaDto, ProjectMediaType} from "../../../dtos/projects/project-media-dto";
import {PageOption} from "../../../lib/dtos/page-dto";
import {QueryBuilder} from "../../../lib/query-builder";

@Component({
  selector: 'app-admin-project-medias-manager',
  templateUrl: './admin-project-medias-manager.component.html',
  styleUrl: './admin-project-medias-manager.component.css',
  standalone: false
})
export class AdminProjectMediasManagerComponent implements OnInit {

  loading = true;
  medias: ProjectMediaDto[] = [];

  addMedia = false;
  fileUpload?: File
  fileUploadDescription: string = '';
  fileUploadLoading = false;

  private page = 0;
  noMoreMedias = false;

  @Output() closed = new EventEmitter<void>();
  @Output() mediaSelected = new EventEmitter<ProjectMediaDto>();

  constructor(protected readonly mediasService: ProjectsMediasService,
              private readonly cdRef: ChangeDetectorRef) {
  }

  onClose(): void {
    this.closed.emit();
  }

  ngOnInit(): void {
    this.load();
  }

  onSelectMedia(media: ProjectMediaDto): void {
    this.mediaSelected.emit(media);
    this.onClose()
  }

  onFileSelected(event: any): void {
    this.fileUpload = event.target.files[0];
  }

  onAddNewMedia(): void {
    if (!this.fileUpload) {
      alert('Veuillez sélectionner un fichier à uploader');
      return;
    }

    this.fileUploadLoading = true;

    const request = new ProjectMediaDto();
    request.mediaDescription = this.fileUploadDescription;
    request.mediaType = this.fileUpload.type === 'video/mp4' ? ProjectMediaType.VIDEO : ProjectMediaType.IMAGE;

    this.mediasService.sendFile(request, this.fileUpload).subscribe({
      next: (media) => {
        this.medias.push(media);
        this.fileUploadLoading = false;
        this.addMedia = false;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        this.fileUploadLoading = false;
        this.cdRef.detectChanges();
        alert('Une erreur est survenue lors de l\'upload du média : ' + err.message);
      }
    })
  }

  loadNextPage(): void {
    if (this.noMoreMedias) {
      return;
    }

    this.page++;
    this.load();
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
        this.cdRef.detectChanges();
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
        this.medias.push(...medias.content);
        this.noMoreMedias = medias.totalPages - 1 <= this.page;
        this.loading = false;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        alert('Une erreur est survenue lors du chargement des médias : ' + err.message);
        this.loading = false;
        this.cdRef.detectChanges();
      }
    })
  }

}
