import { Component } from '@angular/core';

import { Device } from './device.model';

import { DEVICE_TABLE_COLUMNS } from './device-table.config';

@Component({
  selector: 'app-device-management',
  standalone: false,
  templateUrl: './device-management.component.html',
  styleUrl: './device-management.component.css',
})
export class DeviceManagementComponent {

  searchText = '';

  columns = DEVICE_TABLE_COLUMNS;

  devices: Device[] = [];

  activeFilter = 'all';

  selectedOrganization = 'all';

  showLinkDeviceModal = false;

  organizationOptions = [
    {
      label: 'All Organizations',
      value: 'all'
    }
  ];

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  selectOrganization(value: string): void {
    this.selectedOrganization = value;
  }

  refreshDevices(): void {
  }

  openLinkDevice(): void {
    this.showLinkDeviceModal = true;
  }

  closeLinkDeviceModal(): void {
    this.showLinkDeviceModal = false;
  }

  get filteredDevices(): Device[] {
    const search = this.searchText.trim().toLowerCase();
    return this.devices.filter(device => {
      const matchesSearch =
        !search ||
        device.name.toLowerCase().includes(search) ||
        device.serialNumber.toLowerCase().includes(search) ||
        device.macAddress.toLowerCase().includes(search) ||
        device.organizationName.toLowerCase().includes(search);

      const matchesOrganization =
        this.selectedOrganization === 'all' ||
        device.organizationName === this.selectedOrganization;

      const matchesFilter =
        this.activeFilter === 'all' ||
        (this.activeFilter === 'linked' && !!device.organizationName) ||
        (this.activeFilter === 'active' && device.status === 'online') ||
        (this.activeFilter === 'live' && device.status === 'online');
      return matchesSearch && matchesOrganization && matchesFilter;
    });
  }
}