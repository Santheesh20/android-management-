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
  selector: 'app-add-branding',
  standalone: false,
  templateUrl: './add-branding.component.html',
  styleUrl: './add-branding.component.css',
})
export class AddBrandingComponent implements OnInit, OnDestroy {
  @Output() closeModal = new EventEmitter<void>();
  mediaType: 'static' | 'video' = 'static';
  mediaTypeOptions = [
    {
      label: 'Static Image',
      value: 'static'
    },
    {
      label: 'Video Banner',
      value: 'video'
    }
  ];
  imageSourceType: 'upload' | 'url' = 'upload';
  showDesignGuide = true;
  showTitleSubtitle = false;
  selectedFileName: string | null = null;
  imagePreviewUrl: string | null = null;
  isDraggingOver = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  setMediaType(value: string): void {
    this.mediaType = value === 'video' ? 'video' : 'static';
  }

  setImageSource(type: 'upload' | 'url'): void {
    this.imageSourceType = type;
  }

  toggleDesignGuide(): void {
    this.showDesignGuide = !this.showDesignGuide;
  }

  toggleTitleSubtitle(): void {
    this.showTitleSubtitle = !this.showTitleSubtitle;
  }

  triggerFileInput(input: HTMLInputElement): void {
    input.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files && input.files.length ? input.files[0] : null;
    if (!file) {
      return;
    }
    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);

    input.value = '';
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDraggingOver = false;
    const file = event.dataTransfer?.files?.length ? event.dataTransfer.files[0] : null;
    if (!file) {
      return;
    }
    this.selectedFileName = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeSelectedImage(): void {
    this.selectedFileName = null;
    this.imagePreviewUrl = null;
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    console.log('Create Banner clicked');
  }
}