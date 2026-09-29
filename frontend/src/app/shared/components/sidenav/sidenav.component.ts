import { Component, Input } from '@angular/core';

interface MenuItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: false,
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  @Input() collapsed = false;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', route: '/dashboard', icon: 'bi-speedometer2' },
    { label: 'Branding & UI', route: '/branding-ui', icon: 'bi-palette2' },
    { label: 'App Whitelist', route: '/app-whitelist', icon: 'bi-shield-check' },
    { label: 'Organizations', route: '/organizations', icon: 'bi-building' },
    { label: 'Application Management', route: '/application-management', icon: 'bi-hdd-network' },
    { label: ' Device Management', route: '/device-management', icon: 'bi-pc-display-horizontal' },
    { label: 'Login Activity', route: '/login-activity', icon: 'bi-clock-history' },
    { label: 'Audit Logs', route: '/audit-logs', icon: 'bi-journal-text' },
    { label: 'Settings', route: '/settings', icon: 'bi-gear' },
  ];
}

