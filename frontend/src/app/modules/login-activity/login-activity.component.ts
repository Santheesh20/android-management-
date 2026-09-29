import { Component } from '@angular/core';
import { TableColumn } from '../../shared/components/data-table/data-table.model';

interface LoginActivityLog {
  timestamp: string;
  user: { main: string; sub: string };
  activity: string;
  ip: string;
  browser: string;
  expand?: string;
}

@Component({
  selector: 'app-login-activity',
  standalone: false,
  templateUrl: './login-activity.component.html',
  styleUrl: './login-activity.component.css',
})
export class LoginActivityComponent {

  searchTerm = '';
  activityType = 'all';
  dateFrom = '';
  dateTo = '';

  activityTypeOptions = [
    { label: 'All Activity Types', value: 'all' },
    { label: 'Login', value: 'login' },
    { label: 'Logout', value: 'logout' },
    { label: 'Failed Login', value: 'failed' },
  ];
  stats = [
    {
      icon: 'bi-shield-lock-fill',
      iconBg: 'bg-[rgba(185,134,104,0.12)]',
      iconBorder: 'border-[rgba(185,134,104,0.20)]',
      iconColor: 'text-[#d9a988]',
      hoverBorder: 'hover:border-[rgba(185,134,104,0.35)]',
      value: 84,
      label: 'Total Auth Events'
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
      icon: 'bi-box-arrow-in-right',
      iconBg: 'bg-[rgba(96,165,250,0.12)]',
      iconBorder: 'border-[rgba(96,165,250,0.20)]',
      iconColor: 'text-[#60a5fa]',
      hoverBorder: 'hover:border-[rgba(96,165,250,0.35)]',
      value: 68,
      label: 'Total Logins'
    },
    {
      icon: 'bi-exclamation-triangle-fill',
      iconBg: 'bg-[rgba(248,113,113,0.12)]',
      iconBorder: 'border-[rgba(248,113,113,0.20)]',
      iconColor: 'text-red-400',
      hoverBorder: 'hover:border-[rgba(248,113,113,0.35)]',
      value: 9,
      label: 'Failed Logins'
    }
  ];

  columns: TableColumn[] = [
    { key: 'timestamp', label: 'Timestamp', type: 'text' },
    { key: 'user', label: 'User', type: 'stacked' },
    { key: 'activity', label: 'Activity', type: 'badge' },
    { key: 'ip', label: 'IP Address', type: 'text' },
    { key: 'browser', label: 'Browser / Device', type: 'text' },
    { key: 'expand', label: '', type: 'chevron' }
  ];

  logs: LoginActivityLog[] = [
    {
      timestamp: '10 Sep 2026, 11:31:16 AM',
      user: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'Reseller' },
      activity: 'Login',
      ip: '103.102.98.219',
      browser: 'Chrome on Linux'
    },
    {
      timestamp: '05 Sep 2026, 11:57:18 PM',
      user: { main: 'nithin.kumar@innolensmedia.com', sub: 'Reseller' },
      activity: 'Logout',
      ip: '103.102.96.35',
      browser: 'Safari on macOS'
    },
    {
      timestamp: '05 Sep 2026, 11:54:41 PM',
      user: { main: 'nithin.kumar@innolensmedia.com', sub: 'Reseller' },
      activity: 'Login',
      ip: '103.102.96.35',
      browser: 'Safari on macOS'
    },
    {
      timestamp: '03 Sep 2026, 05:45:06 PM',
      user: { main: 'ananth.subramaniam@innolensmedia.com', sub: 'Reseller' },
      activity: 'Login',
      ip: '103.102.98.219',
      browser: 'Chrome on Linux'
    }
  ];

  get filteredLogs(): LoginActivityLog[] {
    return this.logs.filter(log => {
      const term = this.searchTerm.toLowerCase();
      const matchesSearch = !term ||
        log.user.main.toLowerCase().includes(term) ||
        log.ip.includes(term);

      const matchesActivity = this.activityType === 'all' ||
        log.activity.toLowerCase() === this.activityType;

      return matchesSearch && matchesActivity;
    });
  }

  onActivityTypeChange(value: string): void {
    this.activityType = value;
  }

  refresh(): void {
    this.searchTerm = '';
    this.activityType = 'all';
    this.dateFrom = '';
    this.dateTo = '';
  }

  exportCSV(): void {
    const headers = ['Timestamp', 'User', 'Role', 'Activity', 'IP Address', 'Browser/Device'];
    const rows = this.filteredLogs.map(log => [
      log.timestamp, log.user.main, log.user.sub, log.activity, log.ip, log.browser
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'login-activity.csv';
    link.click();
    URL.revokeObjectURL(url);
  }
}