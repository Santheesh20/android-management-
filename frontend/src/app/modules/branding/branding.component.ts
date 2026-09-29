import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  standalone: false,
  templateUrl: './branding.component.html',
  styleUrl: './branding.component.css'
})
export class BrandingComponent {

  searchText = '';

  activeFilter = 'all';

  banners: any[] = [];

  showAddBannerModal = false;

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  addBanner(): void {
    this.showAddBannerModal = true;
  }

  closeAddBannerModal(): void {
    this.showAddBannerModal = false;
  }

}