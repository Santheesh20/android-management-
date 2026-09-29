import { Component } from '@angular/core';
import { TableColumn } from '../../shared/components/data-table/data-table.model';

interface AuditLogEntry {
  timestamp: string;
  user: { main: string; sub: string };
  category: string;
  action: string;
  resource: { main: string; sub: string };
  description: string;
  ip: string;
  expand?: string;
}

@Component({
  selector: 'app-audit-logs',
  standalone: false,
  templateUrl: './audit-logs.component.html',
  styleUrl: './audit-logs.component.css',
})
export class AuditLogsComponent {

  searchTerm = '';
  category = 'all';
  action = 'all';
  dateFrom = '';
  dateTo = '';

  categoryOptions = [
    { label: 'All Categories', value: 'all' },
    { label: 'Auth', value: 'auth' },
    { label: 'User', value: 'user' },
    { label: 'Device', value: 'device' },
    { label: 'App', value: 'app' },
    { label: 'Ota', value: 'ota' },
    { label: 'Banner', value: 'banner' },
    { label: 'Organization', value: 'organization' },
    { label: 'Role', value: 'role' },
    { label: 'Whitelist', value: 'whitelist' },
    { label: 'Ip whitelist', value: 'ip_whitelist' },
    { label: 'Customer', value: 'customer' },
    { label: 'Branding', value: 'branding' },
    { label: 'Domain', value: 'domain' },
    { label: 'Settings', value: 'settings' },
  ];

  actionOptions = [
    { label: 'All Actions', value: 'all' },
    { label: 'Login', value: 'login' },
    { label: 'Logout', value: 'logout' },
    { label: 'Login failed', value: 'login_failed' },
    { label: 'Create', value: 'create' },
    { label: 'Update', value: 'update' },
    { label: 'Delete', value: 'delete' },
    { label: 'Assign', value: 'assign' },
    { label: 'Unassign', value: 'unassign' },
    { label: 'Execute', value: 'execute' },
    { label: 'Export', value: 'export' },
  ];

  stats = [
    {
      icon: 'bi-activity',
      iconBg: 'bg-[rgba(185,134,104,0.12)]',
      iconBorder: 'border-[rgba(185,134,104,0.20)]',
      iconColor: 'text-[#d9a988]',
      hoverBorder: 'hover:border-[rgba(185,134,104,0.35)]',
      value: 126,
      label: 'Total Logs'
    },
    {
      icon: 'bi-clock-fill',
      iconBg: 'bg-[rgba(52,211,153,0.12)]',
      iconBorder: 'border-[rgba(52,211,153,0.20)]',
      iconColor: 'text-emerald-400',
      hoverBorder: 'hover:border-[rgba(52,211,153,0.35)]',
      value: 1,
      label: 'Today'
    },
    {
      icon: 'bi-shield-lock-fill',
      iconBg: 'bg-[rgba(96,165,250,0.12)]',
      iconBorder: 'border-[rgba(96,165,250,0.20)]',
      iconColor: 'text-[#60a5fa]',
      hoverBorder: 'hover:border-[rgba(96,165,250,0.35)]',
      value: 104,
      label: 'Auth Events'
    },
    {
      icon: 'bi-people-fill',
      iconBg: 'bg-[rgba(168,85,247,0.12)]',
      iconBorder: 'border-[rgba(168,85,247,0.20)]',
      iconColor: 'text-purple-400',
      hoverBorder: 'hover:border-[rgba(168,85,247,0.35)]',
      value: 126,
      label: 'Filtered Results'
    }
  ];

  columns: TableColumn[] = [
    { key: 'timestamp', label: 'Timestamp', type: 'text' },
    { key: 'user', label: 'User', type: 'stacked' },
    { key: 'category', label: 'Category', type: 'badge' },
    { key: 'action', label: 'Action', type: 'badge' },
    { key: 'resource', label: 'Resource', type: 'stacked' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'ip', label: 'IP Address', type: 'text' },
    { key: 'expand', label: '', type: 'chevron' }
  ];

  logs: AuditLogEntry[] = [
    {
      timestamp: '16 Sep 2026, 10:43:20 AM',
      user: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'Reseller' },
      category: 'auth',
      action: 'login',
      resource: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'session' },
      description: 'User logged in: ananth.subramaniam@innolensmedia.com',
      ip: '103.102.98.219'
    },
    {
      timestamp: '15 Sep 2026, 02:48:34 PM',
      user: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'Reseller' },
      category: 'auth',
      action: 'login',
      resource: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'session' },
      description: 'User logged in: ananth.subramaniam@innolensmedia.com',
      ip: '120.60.78.62'
    },
    {
      timestamp: '15 Sep 2026, 01:48:36 PM',
      user: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'Reseller' },
      category: 'auth',
      action: 'login',
      resource: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'session' },
      description: 'User logged in: ananth.subramaniam@innolensmedia.com',
      ip: '120.60.78.62'
    }
  ];

  get filteredLogs(): AuditLogEntry[] {
    return this.logs.filter(log => {
      const term = this.searchTerm.toLowerCase();
      const matchesSearch = !term ||
        log.user.main.toLowerCase().includes(term) ||
        log.description.toLowerCase().includes(term) ||
        log.ip.includes(term);

      const matchesCategory = this.category === 'all' || log.category === this.category;
      const matchesAction = this.action === 'all' || log.action === this.action;

      return matchesSearch && matchesCategory && matchesAction;
    });
  }

  onCategoryChange(value: string): void {
    this.category = value;
  }

  onActionChange(value: string): void {
    this.action = value;
  }

  exportCSV(): void {
    const headers = ['Timestamp', 'User', 'Role', 'Category', 'Action', 'Resource', 'Description', 'IP Address'];
    const rows = this.filteredLogs.map(log => [
      log.timestamp, log.user.main, log.user.sub, log.category,
      log.action, log.resource.main, log.description, log.ip
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'audit-logs.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}