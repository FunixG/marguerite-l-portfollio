import {CrudHttpClient} from "../../lib/requests/crud-http-client";
import {ProjectDto} from "../../dtos/projects/project-dto";
import {ChangeDetectorRef, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BaseProjectModule} from "./modules/base-project-module";
import {ErrorDto} from "../../lib/dtos/error-dto";
import {TextProjectModule} from "./modules/text-project-module";
import {ImageAndImageModule} from "./modules/image-and-image-module";
import {ImageAndTextModule} from "./modules/image-and-text-module";
import {TextAndImageModule} from "./modules/text-and-image-module";
import {VideoModule} from "./modules/video-module";
import {ImageModule} from "./modules/image-module";
import {QueryBuilder, QueryParam} from "../../lib/query-builder";
import {PageOption} from "../../lib/dtos/page-dto";

@Injectable({
    providedIn: 'root'
})
export default class ProjectsService extends CrudHttpClient<ProjectDto> {

    loadingModules: boolean = true;

    modules: BaseProjectModule[] = [];
    loadedProject?: ProjectDto

    constructor(http: HttpClient) {
        super(http, environment.apiUrl, '/projects');
    }

    findByPath(
        path: string,
        success: (project: ProjectDto) => void = (_: ProjectDto) => {},
        fail: (error: ErrorDto) => void = (_: ErrorDto) => {}
    ): void {
        const query = new QueryBuilder()
        const equalsQuery = new QueryParam()

        equalsQuery.type = QueryBuilder.equal
        equalsQuery.value = path
        equalsQuery.key = 'path'

        query.addParam(equalsQuery)

        const pageOption = new PageOption()
        pageOption.page = 0
        pageOption.elemsPerPage = 1

        this.find(pageOption, query).subscribe({
            next: (page) => {
                if (page.content.length > 0) {
                    success(page.content[0])
                } else {
                    fail(new ErrorDto('Aucun projet trouvé avec ce chemin', 404, 1, []))
                }
            },
            error: (err: ErrorDto) => {
                fail(err)
            }
        })
    }

    loadProject(id: string, cdRef: ChangeDetectorRef, failedLoad: (err: ErrorDto) => void = () => {}): void {
        this.loadingModules = true;

        if (id == 'new') {
            this.loadedProject = new ProjectDto();
            this.modules = [];
            this.loadingModules = false;
            cdRef.detectChanges();
        } else {
            this.getById(id).subscribe({
                next: (project) => {
                    this.loadedProject = project;
                    this.modules = this.loadProjectsModules();
                    this.loadingModules = false;
                    cdRef.detectChanges();
                },
                error: (err: ErrorDto) => {
                    failedLoad(err);
                    cdRef.detectChanges();
                }
            });
        }
    }

    save(success: (project: ProjectDto) => void = (_: ProjectDto) => {},
         fail: (error: ErrorDto) => void = (_: ErrorDto) => {}): void {
        if (!this.loadedProject) {
            fail(new ErrorDto('Pas de projet chargé', -1, 1, []));
            return;
        }

        if (this.loadedProject.title.length === 0 || this.loadedProject.path.length === 0) {
            fail(new ErrorDto('Veuillez remplir le titre du projet.', -1, 1, []));
            return;
        }
        if (this.loadedProject.description.length === 0) {
            fail(new ErrorDto('Veuillez remplir la description du projet.', -1, 1, []));
            return;
        }
        if (this.loadedProject.coverMediaId.length === 0) {
            fail(new ErrorDto('Veuillez sélectionner une image de couverture pour le projet.', -1, 1, []));
            return;
        }

        this.setPageCodeInProject();

        if (this.modules.length === 0 || this.loadedProject.htmlCode.length === 0 || this.loadedProject.jsonCode.length === 0) {
            fail(new ErrorDto('Le projet doit contenir au moins un module.', -1, 1, []));
            return;
        }

        if (this.loadedProject.id) {
            this.update(this.loadedProject).subscribe({
                next: (project) => {
                    success(project);
                },
                error: (err: ErrorDto) => {
                    fail(err);
                }
            });
        } else {
            this.create(this.loadedProject).subscribe({
                next: (project) => {
                    this.loadedProject = project;
                    success(project);
                },
                error: (err: ErrorDto) => {
                    fail(err);
                }
            });
        }
    }

    private setPageCodeInProject(): void {
        if (!this.loadedProject) return;

        let jsonList: string[] = [];
        let htmlCode: string = '';

        this.modules.forEach(module => {
            jsonList.push(module.toJson());
            htmlCode += module.getHtml();
        });

        this.loadedProject.jsonCode = JSON.stringify(jsonList);
        this.loadedProject.htmlCode = htmlCode;
    }

    getModuleById<T extends BaseProjectModule>(id: string): T | undefined {
        const module: BaseProjectModule | undefined = this.modules.find(module => module.getId() == id);

        if (module) {
            return module as T;
        } else {
            return undefined;
        }
    }

    private loadProjectsModules(): BaseProjectModule[] {
        if (!this.loadedProject) return [];

        let jsonData: string[] = JSON.parse(this.loadedProject.jsonCode);
        let projects: BaseProjectModule[] = [];

        jsonData.forEach(json => {
            let data: { data: string, type: string } = JSON.parse(json);

            let module = this.getModuleByName(data);
            if (module) {
                projects.push(module);
            }
        });

        return projects;
    }

    private getModuleByName(data: { data: string, type: string }): BaseProjectModule | undefined {
        switch (data.type) {
            case new ImageAndImageModule().moduleName:
                return ImageAndImageModule.fromJson(data.data);
            case new ImageAndTextModule().moduleName:
                return ImageAndTextModule.fromJson(data.data);
            case new ImageModule().moduleName:
                return ImageModule.fromJson(data.data);
            case new TextAndImageModule().moduleName:
                return TextAndImageModule.fromJson(data.data);
            case new TextProjectModule().moduleName:
                return TextProjectModule.fromJson(data.data);
            case new VideoModule().moduleName:
                return VideoModule.fromJson(data.data);

            default:
                console.warn("Unknown module name: " + data.type);
                return undefined;
        }
    }

}
