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
  selector: 'app-add-user',
  standalone: false,
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css',
})
export class AddUserComponent implements OnInit, OnDestroy {

  @Output() closeModal = new EventEmitter<void>();
  email = '';
  password = '';
  organization = '';
  role = '';

  submitted = false;
  organizationOptions = [
    { label: 'Innolens Media and Broadcasting Limited', value: 'Innolens Media and Broadcasting Limited' },
  ];

  roleOptions = [
    { label: 'Reseller Admin', value: 'Reseller Admin' },
  ];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  get isEmailInvalid(): boolean {
    return this.submitted && !this.email.trim();
  }

  get isPasswordInvalid(): boolean {
    return this.submitted && !this.password.trim();
  }

  get isOrganizationInvalid(): boolean {
    return this.submitted && !this.organization;
  }

  get isRoleInvalid(): boolean {
    return this.submitted && !this.role;
  }

  setOrganization(value: string): void {
    this.organization = value;
  }

  setRole(value: string): void {
    this.role = value;
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.isEmailInvalid || this.isPasswordInvalid || this.isOrganizationInvalid || this.isRoleInvalid) {
      return;
    }

    console.log('Create User clicked', {
      email: this.email.trim(),
      organization: this.organization,
      role: this.role,
    });

    this.closeModal.emit();
  }
}