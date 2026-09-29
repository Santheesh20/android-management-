import { Component } from '@angular/core';

interface AllowedIp {
  ip: string;
  cidr: string;
  description: string;
}

interface SettingsTab {
  id: 'general' | 'beta' | 'device' | 'network';
  label: string;
  icon: string;
}

@Component({
  selector: 'app-settings',
  standalone: false,
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css',
})

export class SettingsComponent {
  activeTab: SettingsTab['id'] = 'general';
  tabs: SettingsTab[] = [
    { id: 'general', label: 'General', icon: 'bi-sliders' },
    { id: 'beta', label: 'Beta Features', icon: 'bi-stars' },
    { id: 'device', label: 'Device Defaults', icon: 'bi-arrow-repeat' },
    { id: 'network', label: 'Network Alerts', icon: 'bi-globe2' },
  ];

  bannerCarouselInterval = 6;
  bannerVideoIdleTimeout = 30;
  bannerVideoCycleCount = '-1';

  cycleCountOptions = [
    { label: 'Infinite', value: '-1' },
    { label: '1 cycle', value: '1' },
    { label: '2 cycles', value: '2' },
    { label: '3 cycles', value: '3' },
    { label: '5 cycles', value: '5' },
    { label: '10 cycles', value: '10' },
  ];

  devicesV2Enabled = false;
  autoUpdateAllNewDevices = false;
  includeSubOrganizations = false;
  networkChangeAlertsEnabled = false;
  allowedIps: AllowedIp[] = [];
  newIp = '';
  newCidr = '';
  newDescription = '';

  setTab(id: SettingsTab['id']): void {
    this.activeTab = id;
  }

  toggleDevicesV2(): void {
    this.devicesV2Enabled = !this.devicesV2Enabled;
  }

  toggleAutoUpdate(): void {
    this.autoUpdateAllNewDevices = !this.autoUpdateAllNewDevices;
  }

  toggleNetworkAlerts(): void {
    this.networkChangeAlertsEnabled = !this.networkChangeAlertsEnabled;
  }

  addAllowedIp(): void {
    if (!this.newIp.trim()) {
      return;
    }
    this.allowedIps.push({
      ip: this.newIp.trim(),
      cidr: this.newCidr.trim(),
      description: this.newDescription.trim(),
    });
    this.newIp = '';
    this.newCidr = '';
    this.newDescription = '';
  }

  removeAllowedIp(index: number): void {
    this.allowedIps.splice(index, 1);
  }

  applyToExistingDevices(): void {
    // api integration for the existing devices to apply the settings
  }

  resetChanges(): void {
    // api integration to reset 
  }

  saveChanges(): void {
    // TODO: persist settings
  }
}
