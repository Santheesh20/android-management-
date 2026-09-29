import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css'],
  standalone: false
})
export class DropdownComponent {

  @Input() label: string = '';
  @Input() placeholder: string = 'Select an option';
  @Input() options: { label: string; value: string }[] = [];
  @Input() value: string = '';
  @Input() disabled: boolean = false;

  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  toggleDropdown(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled) {
      return;
    }

    this.isOpen = !this.isOpen;
  }

  selectOption(option: { label: string; value: string }, event: MouseEvent): void {
    event.stopPropagation();

    this.value = option.value;
    this.valueChange.emit(option.value);

    this.isOpen = false;
  }

  getSelectedLabel(): string {
    const selectedOption = this.options.find(
      option => option.value === this.value
    );

    return selectedOption ? selectedOption.label : '';
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.isOpen = false;
  }
}