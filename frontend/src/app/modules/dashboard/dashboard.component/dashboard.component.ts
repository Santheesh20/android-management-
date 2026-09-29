import { Component } from '@angular/core';
import { TableColumn } from '../../../shared/components/data-table/data-table.model';

interface StatCard {
  label: string;
  value: string;
  sub: string;
  icon: string;
  accent: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  stats: StatCard[] = [
    { label: 'Total Devices', value: '1', sub: 'All registered devices', icon: 'bi-tv-fill', accent: 'from-[#8a5a45] to-[#b98668]' },
    { label: 'Online Devices', value: '0', sub: 'Active in last 10 minutes', icon: 'bi-broadcast-pin', accent: 'from-[#8a5a45] to-[#b98668]' },
    { label: 'Poor Wi-Fi Signal', value: '0', sub: 'RSSI below -75 dBm', icon: 'bi-wifi-off', accent: 'from-[#8a5a45] to-[#b98668]' },
    { label: 'Network Warning', value: '0', sub: 'Devices with network issues', icon: 'bi-exclamation-triangle-fill', accent: 'from-[#8a5a45] to-[#b98668]' },
    { label: 'Network Critical', value: '0', sub: 'Devices with critical network issues', icon: 'bi-shield-fill-exclamation', accent: 'from-[#8a5a45] to-[#b98668]' },
    { label: 'Login Activity', value: '8', sub: "Today's login/logout events", icon: 'bi-box-arrow-in-right', accent: 'from-[#8a5a45] to-[#b98668]' },
    { label: 'Network Change Alerts', value: '0', sub: 'Devices with IP outside whitelist', icon: 'bi-globe2', accent: 'from-[#8a5a45] to-[#b98668]' },
  ];

  deviceColumns: TableColumn[] = [
    { key: 'status', label: 'Status', type: 'status' },
    { key: 'serial', label: 'Serial Number', type: 'link' },
    { key: 'customer', label: 'Customer' },
    { key: 'lastSeen', label: 'Last Seen' },
    { key: 'network', label: 'Network', type: 'badge' },
  ];

  devices = [
    { status: 'Offline', serial: '0254841A01976', customer: 'Not linked', lastSeen: 'about 7 hours ago', network: 'Healthy' },
  ];
}