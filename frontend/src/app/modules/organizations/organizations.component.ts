import { Component } from '@angular/core';
import { Organization, OrganizationType } from './organization.model';

@Component({
  selector: 'app-organizations',
  standalone: false,
  templateUrl: './organizations.component.html',
  styleUrl: './organizations.component.css',
})
export class OrganizationsComponent {
  searchText = '';
  activeFilter: 'all' | OrganizationType = 'all';
  organizations: Organization[] = [];
  showAddOrganizationModal = false;

  setFilter(filter: 'all' | OrganizationType): void {
    this.activeFilter = filter;
  }

  addOrganization(): void {
    this.showAddOrganizationModal = true;
  }

  closeAddOrganizationModal(): void {
    this.showAddOrganizationModal = false;
  }

  get filteredOrganizations(): Organization[] {
    return this.organizations.filter(org => {
      const matchesSearch = org.name.toLowerCase().includes(this.searchText.trim().toLowerCase());
      const matchesFilter = this.activeFilter === 'all' || org.type === this.activeFilter;
      return matchesSearch && matchesFilter;
    });
  }

  get distributorCount(): number {
    return this.organizations.filter(org => org.type === 'distributor').length;
  }
  get resellerCount(): number {
    return this.organizations.filter(org => org.type === 'reseller').length;
  }

  get partnerCount(): number {
    return this.organizations.filter(org => org.type === 'partner').length;
  }

  get activeCount(): number {
    return this.organizations.filter(org => org.status === 'active').length;
  }
}

