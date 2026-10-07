import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  sidebarActive = false;
  isProfileOpen = false;
  logoutInProgress = false;
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService
  ) { }
  toggle(): void { this.sidebarActive = !this.sidebarActive; }
  toggleProfile(): void {
    if (this.logoutInProgress) { return; }
    this.isProfileOpen = !this.isProfileOpen;
  }

  closeProfile(): void { this.isProfileOpen = false; }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target =
      event.target as HTMLElement;
    if (!target.closest('.profile-menu')
    ) {
      this.isProfileOpen = false;
    }
  }
  logout(): void {
    if (this.logoutInProgress) {
      return;
    }
    this.logoutInProgress = true;
    this.isProfileOpen = false;
    this.authService
      .logout()
      .subscribe({
        next: (response) => {
          if (!response.success) {
            this.logoutInProgress =
              false;
            return;
          }
          this.router
            .navigate(['/login'])
            .finally(() => {
              this.logoutInProgress =  false;
            });
        },

        error: () => {
          this.logoutInProgress =  false;
        }
      });
  }
}