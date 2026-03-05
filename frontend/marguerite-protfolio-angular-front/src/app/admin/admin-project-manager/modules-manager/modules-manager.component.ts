import {Component, ElementRef, HostListener} from '@angular/core';
import ProjectsService from "../../../../services/projects/projects-service";
import {ImageAndImageModule} from "../../../../services/projects/modules/image-and-image-module";
import {ImageAndTextModule} from "../../../../services/projects/modules/image-and-text-module";
import {TextAndImageModule} from "../../../../services/projects/modules/text-and-image-module";
import {TextProjectModule} from "../../../../services/projects/modules/text-project-module";
import {VideoModule} from "../../../../services/projects/modules/video-module";
import {ImageModule} from "../../../../services/projects/modules/image-module";

@Component({
  selector: 'app-modules-manager',
  templateUrl: './modules-manager.component.html',
  styleUrl: './modules-manager.component.css',
  standalone: false
})
export class ModulesManagerComponent {

  menuOpened: boolean = false;

  constructor(private readonly projectsService: ProjectsService,
              private readonly elementRef: ElementRef) {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.menuOpened = !this.menuOpened;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside && this.menuOpened) {
      this.menuOpened = false;
    }
  }

  addModule(name: string): void {
    switch (name) {
      case new ImageAndImageModule().moduleName:
        this.projectsService.modules.push(new ImageAndImageModule());
        break;
      case new ImageAndTextModule().moduleName:
        this.projectsService.modules.push(new ImageAndTextModule());
        break;
      case new TextAndImageModule().moduleName:
        this.projectsService.modules.push(new TextAndImageModule());
        break;
      case new TextProjectModule().moduleName:
        this.projectsService.modules.push(new TextProjectModule());
        break;
      case new VideoModule().moduleName:
        this.projectsService.modules.push(new VideoModule());
        break;
      case new ImageModule().moduleName:
        this.projectsService.modules.push(new ImageModule());
        break;

      default:
        console.warn("Unknown module name: " + name);
    }
  }

}
