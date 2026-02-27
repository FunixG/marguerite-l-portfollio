import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html'
})
export class ButtonComponent {
  @Input() label: string = 'Envoyer';
  @Input() loading: boolean = false;
  @Input() classBtn: string = 'btn-primary';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();
}
