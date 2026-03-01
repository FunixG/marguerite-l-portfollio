import {BaseProjectModule} from "../../../../services/projects/modules/base-project-module";
import {Directive, Input, OnInit} from "@angular/core";
import ProjectsService from "../../../../services/projects/projects-service";

@Directive()
export abstract class ModuleComponent<T extends BaseProjectModule> implements OnInit {
    @Input() moduleId!: string

    protected readonly projectsService: ProjectsService;

    module?: T

    constructor(projectsService: ProjectsService) {
        this.projectsService = projectsService;
    }

    ngOnInit(): void {
        let module: T | undefined = this.projectsService.getModuleById(this.moduleId);

        if (module) {
            this.module = module;
        }
    }

}