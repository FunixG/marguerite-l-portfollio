import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-admin-project-medias-manager',
  templateUrl: './admin-project-medias-manager.component.html',
  styleUrl: './admin-project-medias-manager.component.css',
  standalone: false
})
export class AdminProjectMediasManagerComponent {

  @Output() closed = new EventEmitter<void>();
  @Output() mediaSelected = new EventEmitter<string>();

  onClose() {
    this.closed.emit();
  }

}
