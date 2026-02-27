import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-input-text',
  imports: [
    FormsModule,
    NgClass
  ],
  templateUrl: './input-text.component.html'
})
export class InputTextComponent {
  @Input() label: string = 'Text';
  @Input() placeholder: string = 'Hint';
  @Input() id: string = 'validationText';
  @Input() text: string = '';
  @Input() required: boolean = true;
  @Input() formSent: boolean = false;
  @Input() disabled: boolean = false;
  @Input() isPassword: boolean = false;
  @Input() inputErrors: string[] = [];
  @Output() textChange = new EventEmitter<string>();

  onInput() {
    this.textChange.emit(this.text);
  }
}
