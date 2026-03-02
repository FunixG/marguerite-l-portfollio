import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import AdminProjectMediasManagerService from "./admin-project-medias-manager.service";

@Component({
  selector: 'app-admin-project-medias-manager',
  templateUrl: './admin-project-medias-manager.component.html',
  styleUrl: './admin-project-medias-manager.component.css',
  standalone: false
})
export class AdminProjectMediasManagerComponent {

  @ViewChild('modalMedias') modal!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
  @Output() closed = new EventEmitter<void>();
  @Output() mediaSelected = new EventEmitter<string>();

  constructor(
      private modalService: AdminProjectMediasManagerService,
      private element: ElementRef
  ) {}

  onClose() {
    this.closed.emit();
  }

}
