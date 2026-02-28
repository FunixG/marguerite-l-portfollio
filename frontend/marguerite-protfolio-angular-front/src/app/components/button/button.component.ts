import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Router} from "@angular/router";

declare var bootstrap: any;

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html'
})
export class ButtonComponent implements AfterViewInit, OnDestroy {
  @Input() label: string = 'Envoyer';
  @Input() loading: boolean = false;
  @Input() classBtn: string = 'btn-primary';
  @Input() disabled: boolean = false;
  @Input() tooltip?: string;
  @Input() url?: string;
  @Output() onClick = new EventEmitter<void>();

  private tooltips: any[] = [];

  constructor(private readonly router: Router,
              private readonly el: ElementRef) {
  }

  ngAfterViewInit() {
    const tooltipTriggerList = this.el.nativeElement.querySelectorAll('[data-bs-toggle="tooltip"]');
    this.tooltips = [...tooltipTriggerList].map((el: HTMLElement) => new bootstrap.Tooltip(el));
  }

  ngOnDestroy(): void {
    this.tooltips.forEach(t => t.dispose());
    this.tooltips = [];
  }

  clickEvent() {
    if (this.url) {
      this.router.navigate([this.url])
    } else {
      this.onClick.emit()
    }
  }
}
