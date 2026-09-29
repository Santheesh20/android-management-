import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-add-template',
  standalone: false,
  templateUrl: './add-template.component.html',
  styleUrl: './add-template.component.css',
})
export class AddTemplateComponent implements OnInit, OnDestroy {

  @Output() closeModal = new EventEmitter<void>();

  templateName = '';
  templateDescription = '';

  submitted = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Same pattern as add-branding: move onto <body> so this modal is never
    // clipped/z-index-fought by any ancestor in the layout.
    this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  get isNameInvalid(): boolean {
    return this.submitted && !this.templateName.trim();
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.isNameInvalid) {
      return;
    }

    console.log('Create Whitelist Template clicked', {
      name: this.templateName.trim(),
      description: this.templateDescription.trim(),
    });

    this.closeModal.emit();
  }
}