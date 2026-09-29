import { Component } from '@angular/core';

@Component({
  selector: 'app-app-whitelist',
  standalone: false,
  templateUrl: './app-whitelist.component.html',
  styleUrl: './app-whitelist.component.css',
})
export class AppWhitelistComponent {

  searchText: string = '';

  activeFilter: string = 'all';

  showAddTemplateModal = false;

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  onCreateWhitelist(): void {
    this.showAddTemplateModal = true;
  }

  closeAddTemplateModal(): void {
    this.showAddTemplateModal = false;
  }
}
