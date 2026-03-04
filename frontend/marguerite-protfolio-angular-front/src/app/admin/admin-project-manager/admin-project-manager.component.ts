import {ChangeDetectorRef, Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import ProjectsService from "../../../services/projects/projects-service";
import {BaseProjectModule} from "../../../services/projects/modules/base-project-module";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ErrorDto} from "../../../lib/dtos/error-dto";
import {ProjectDto} from "../../../dtos/projects/project-dto";

@Component({
  selector: 'app-admin-project-manager',
  templateUrl: './admin-project-manager.component.html',
  styleUrl: './admin-project-manager.component.css',
  standalone: false
})
export class AdminProjectManagerComponent implements OnInit {

  saving: boolean = false;

  constructor(private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly cdRef: ChangeDetectorRef,
              readonly projectsService: ProjectsService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.projectsService.loadProject(params['project'], this.cdRef, (err: ErrorDto) => {
        if (err.status == 404) {
          this.router.navigate(['/admin']).then(() => {
            alert("Le projet que vous essayez de charger n'existe pas.");
          });
        } else if (err.status != 401) {
          alert("Une erreur est survenue lors du chargement du projet : " + err.error);
        }
      });
    });
  }

  drop(event: CdkDragDrop<BaseProjectModule[]>) {
    moveItemInArray(this.projectsService.modules, event.previousIndex, event.currentIndex);
  }

  @HostListener('window:keydown', ['$event'])
  onKeydownSave(event: KeyboardEvent) {
    if (event.key === 's' && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      this.saveProject();
    }
  }

  saveProject() {
    this.saving = true;
    this.projectsService.save((project: ProjectDto) => {
      this.saving = false;

      if (project.id) {
        this.activatedRoute.params.subscribe(params => {
          params['project'] = project.id;
        });
      }

      this.cdRef.detectChanges();
    }, (err: ErrorDto) => {
      this.saving = false;
      this.cdRef.detectChanges();
      alert("Une erreur est survenue lors de la sauvegarde du projet : " + err.error);
    })
  }

}
