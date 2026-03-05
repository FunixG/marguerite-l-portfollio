import {ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable} from "@angular/core";
import {AdminProjectMediasManagerComponent} from "./admin-project-medias-manager.component";
import {ProjectMediaDto} from "../../../dtos/projects/project-media-dto";

@Injectable()
export default class AdminProjectMediasManagerService {

    private modalRef: ComponentRef<AdminProjectMediasManagerComponent> | null = null;

    constructor(
        private readonly appRef: ApplicationRef,
        private readonly environmentInjector: EnvironmentInjector
    ) {}

    openModal(onPick: (media: ProjectMediaDto) => void = () => {}) {
        if (this.modalRef) {
            return;
        }

        this.modalRef = createComponent(AdminProjectMediasManagerComponent, {
            environmentInjector: this.environmentInjector
        });

        this.modalRef.instance.closed.subscribe(() => this.closeModal());
        this.modalRef.instance.mediaSelected.subscribe((media: ProjectMediaDto) => {
            onPick(media);
        });

        this.appRef.attachView(this.modalRef.hostView)
        const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
        document.body.appendChild(domElem);
    }

    closeModal(): void {
        if (!this.modalRef) {
            return;
        }

        const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
        if (domElem.parentNode) {
            domElem.remove();
        }

        this.appRef.detachView(this.modalRef.hostView);
        this.modalRef.destroy();
        this.modalRef = null;
    }

}
