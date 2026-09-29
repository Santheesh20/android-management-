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
  selector: 'app-add-organization',
  standalone: false,
  templateUrl: './add-organization.component.html',
  styleUrl: './add-organization.component.css',
})
export class AddOrganizationComponent implements OnInit, OnDestroy {

  @Output() closeModal = new EventEmitter<void>();

  organizationName = '';
  organizationType = '';
  parentOrganization = '';
  slug = '';
  status = 'active';
  contactEmail = '';
  contactPhone = '';
  address = '';

  inheritDefaultBanners = true;
  enableAutoUpdate = false;

  apiSoftware = 'radius';

  submitted = false;
  organizationTypeOptions = [
    { label: 'Distributor', value: 'distributor' },
    { label: 'Reseller', value: 'reseller' },
    { label: 'Partner', value: 'partner' },
  ];

  parentOrganizationOptions = [
    { label: 'Top-level (no parent)', value: '' },
    { label: 'Innolens Media and Broadcasting Limited', value: 'innolens-media-broadcasting' },
  ];

  statusOptions = [
    { label: 'Active', value: 'active' },
    { label: 'Inactive', value: 'inactive' },
    { label: 'Suspended', value: 'suspended' },
  ];

  apiSoftwareOptions = [
    { label: 'RADIUS', value: 'radius' },
    { label: 'None', value: 'none' },
  ];

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.appendChild(document.body, this.elementRef.nativeElement);
    document.body.style.overflow = 'hidden';
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
  }

  get isNameInvalid(): boolean {
    return this.submitted && !this.organizationName.trim();
  }
  get isTypeInvalid(): boolean {
    return this.submitted && !this.organizationType;
  }

  get isSlugInvalid(): boolean {
    return this.submitted && !this.slug.trim();
  }

  setOrganizationType(value: string): void {
    this.organizationType = value;
  }

  setParentOrganization(value: string): void {
    this.parentOrganization = value;
  }

  setStatus(value: string): void {
    this.status = value;
  }

  setApiSoftware(value: string): void {
    this.apiSoftware = value;
  }

  toggleInheritDefaultBanners(): void {
    this.inheritDefaultBanners = !this.inheritDefaultBanners;
  }

  toggleAutoUpdate(): void {
    this.enableAutoUpdate = !this.enableAutoUpdate;
  }

  onCancel(): void {
    this.closeModal.emit();
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.isNameInvalid || this.isTypeInvalid || this.isSlugInvalid) {
      return;
    }
    console.log('Create Organization clicked', {
      name: this.organizationName.trim(),
      type: this.organizationType,
      parentOrganization: this.parentOrganization,
      slug: this.slug.trim(),
      status: this.status,
      contactEmail: this.contactEmail.trim(),
      contactPhone: this.contactPhone.trim(),
      address: this.address.trim(),
      inheritDefaultBanners: this.inheritDefaultBanners,
      enableAutoUpdate: this.enableAutoUpdate,
      apiSoftware: this.apiSoftware,
    });

    this.closeModal.emit();
  }
}

