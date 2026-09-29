import { Component } from '@angular/core';
import { Role, RoleStatus } from './role.model';

@Component({
  selector: 'app-roles',
  standalone: false,
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {

  searchText = '';

  activeFilter: 'all' | RoleStatus = 'all';
  roles: Role[] = [];

  setFilter(filter: 'all' | RoleStatus): void {
    this.activeFilter = filter;
  }

  addRole(): void {
    console.log('Add Role clicked');
  }

  get filteredRoles(): Role[] {
    return this.roles.filter(role => {
      const matchesSearch = role.name.toLowerCase().includes(this.searchText.trim().toLowerCase());
      const matchesFilter = this.activeFilter === 'all' || role.status === this.activeFilter;
      return matchesSearch && matchesFilter;
    });
  }

  get totalRoles(): number {
    return this.roles.length;
  }

  get activeRolesCount(): number {
    return this.roles.filter(r => r.status === 'active').length;
  }

  get totalUsersAssigned(): number {
    return this.roles.reduce((sum, r) => sum + r.usersAssigned, 0);
  }

  visiblePermissions(role: Role): string[] {
    return role.permissions.slice(0, 2);
  }

  extraPermissionsCount(role: Role): number {
    return Math.max(0, role.permissions.length - 2);
  }
}