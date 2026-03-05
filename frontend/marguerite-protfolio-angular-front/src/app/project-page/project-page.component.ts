import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectDto} from "../../dtos/projects/project-dto";
import ProjectsService from "../../services/projects/projects-service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css',
  standalone: false
})
export class ProjectPageComponent implements OnInit {

  project: ProjectDto = new ProjectDto()

  constructor(private readonly projectService: ProjectsService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly router: Router,
              private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const projectPath = params['project']

      this.projectService.findByPath(projectPath, (project) => {
        this.project = project
        this.cdRef.detectChanges()
      }, (_) => {
        this.router.navigate(['/'])
      })
    })
  }

}
