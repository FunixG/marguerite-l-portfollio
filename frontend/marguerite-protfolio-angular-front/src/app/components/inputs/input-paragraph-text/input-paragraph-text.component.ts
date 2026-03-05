import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-input-paragraph-text',
  imports: [
    FormsModule
  ],
  templateUrl: './input-paragraph-text.component.html',
  styleUrl: './input-paragraph-text.component.css',
})
export class InputParagraphTextComponent {

  @Input() text: string = ""
  @Input() placeholder: string = "Entre la description du projet"
  @Output() textChange = new EventEmitter<string>()

  onTextChange() {
    this.textChange.emit(this.text);
  }

}
