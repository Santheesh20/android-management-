import { Component } from '@angular/core';
import { UserRecord } from './user.model';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {

  searchText = '';

  organizationFilter = '';

  activeRoleFilter = 'all';

  pageSize = 50;

  currentPage = 1;

  users: UserRecord[] = [];

  showAddUserModal = false;

  organizationOptions = [
    { label: 'All Organizations', value: '' },
    { label: 'Innolens Media and Broadcasting Limited', value: 'Innolens Media and Broadcasting Limited' },
  ];

  roleFilters = [
    { label: 'All Roles', value: 'all' },
    { label: 'Reseller Admin', value: 'Reseller' },
  ];

  setOrganizationFilter(value: string): void {
    this.organizationFilter = value;
    this.currentPage = 1;
  }

  setRoleFilter(value: string): void {
    this.activeRoleFilter = value;
    this.currentPage = 1;
  }

   addUser(): void {
    this.showAddUserModal = true;
  }

  closeAddUserModal(): void {
    this.showAddUserModal = false;
  }

  get filteredUsers(): UserRecord[] {
    return this.users.filter(user => {
      const matchesSearch = user.email.toLowerCase().includes(this.searchText.trim().toLowerCase());
      const matchesOrg = !this.organizationFilter || user.organizationName === this.organizationFilter;
      const matchesRole = this.activeRoleFilter === 'all' || user.role === this.activeRoleFilter;
      return matchesSearch && matchesOrg && matchesRole;
    });
  }

  get totalUsers(): number {
    return this.users.length;
  }

  get verifiedCount(): number {
    return this.users.filter(u => u.status === 'verified').length;
  }

  get activeCount(): number {
    return this.users.filter(u => u.online).length;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredUsers.length / this.pageSize));
  }

  get paginatedUsers(): UserRecord[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers.slice(start, start + this.pageSize);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}