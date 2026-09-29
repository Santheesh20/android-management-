import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarActive = false;
  isProfileOpen = false;

  toggle() {
    this.sidebarActive = !this.sidebarActive;
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout() {
    // TODO: wire real logout logic
  }
}