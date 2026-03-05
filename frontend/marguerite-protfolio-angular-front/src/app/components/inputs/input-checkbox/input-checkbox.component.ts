import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-input-checkbox',
  imports: [],
  templateUrl: './input-checkbox.component.html',
  styleUrl: 'input-checkbox.component.css'
})
export class InputCheckboxComponent {

  @Input() label: string = '';
  @Input() checked: boolean = false;
  @Input() disabled: boolean = false;
  @Output() onChange = new EventEmitter<boolean>();

  onCheckEvent(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;

    this.onChange.emit(this.checked);
  }
}
