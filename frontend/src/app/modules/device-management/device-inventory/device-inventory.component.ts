import { Component } from '@angular/core';

@Component({
  selector: 'app-device-inventory',
  standalone: false,
  templateUrl: './device-inventory.component.html',
  styleUrl: './device-inventory.component.css',
})
export class DeviceInventoryComponent {
  searchText = '';
  activeStatus = 'all';
  selectedTier = 'all';
  selectedOrganization = 'all';
  totalDevices = 0;
  availableDevices = 0;
  assignedDevices = 0;
  inUseDevices = 0;
}