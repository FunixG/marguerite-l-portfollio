import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ProjectDto} from "../../dtos/projects/project-dto";
import ProjectsService from "../../services/projects/projects-service";
import ProjectsMediasService from "../../services/projects/projects-medias-service";
import {PageOption} from "../../lib/dtos/page-dto";
import {QueryBuilder, QueryParam} from "../../lib/query-builder";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent implements OnInit {

  projects: ProjectDto[] = []

  private page: number = 0
  hasMore: boolean = false

  constructor(private readonly projectService: ProjectsService,
              protected readonly mediasService: ProjectsMediasService,
              private readonly router: Router,
              private readonly cdRef: ChangeDetectorRef) {
  }

  openProject(project: ProjectDto): void {
    this.router.navigate(['/', project.path])
  }

  ngOnInit(): void {
    this.loadProjects()
  }

  nextPage(): void {
    if (!this.hasMore) {
      return
    }

    this.page++
    this.loadProjects()
  }

  private loadProjects(): void {
    const pageOption = new PageOption()
    pageOption.page = this.page
    pageOption.elemsPerPage = 5
    pageOption.sort = 'createdAt:desc'

    const query = new QueryBuilder()
    const publicQuery = new QueryParam()
    publicQuery.key = 'isVisible'
    publicQuery.type = QueryBuilder.isTrue
    publicQuery.value = 'true'
    query.addParam(publicQuery)

    this.projectService.find(pageOption, query).subscribe({
      next: (page) => {
        this.projects.push(...page.content)
        this.hasMore = page.totalPages - 1 > this.page;
        this.cdRef.detectChanges()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

}
