import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectDto} from "../../../dtos/projects/project-dto";
import ProjectsService from "../../../services/projects/projects-service";
import {PageDTO, PageOption} from "../../../lib/dtos/page-dto";
import {QueryBuilder} from "../../../lib/query-builder";
import {ErrorDto} from "../../../lib/dtos/error-dto";

@Component({
    selector: 'app-admin-projects-list',
    templateUrl: './admin-projects-list.component.html',
    standalone: false
})
export class AdminProjectsListComponent implements OnInit {

    projects: ProjectDto[] = []
    loading: boolean = true

    constructor(private readonly projectsService: ProjectsService,
                private readonly cdRef: ChangeDetectorRef) {
    }

    ngOnInit(): void {
        this.projectsService.find(new PageOption(), new QueryBuilder())
            .subscribe({
                next: (projects: PageDTO<ProjectDto>) => {
                    this.projects = projects.content
                    this.loading = false
                    this.cdRef.detectChanges()
                },
                error: (err: ErrorDto) => {
                    if (err.status == 401) {
                        globalThis.location.reload()
                    } else {
                        alert('Une erreur est survenue lors du chargement des projets. Rechargez la page ou contactez votre administrateur.')
                    }
                }
            })
    }

}
