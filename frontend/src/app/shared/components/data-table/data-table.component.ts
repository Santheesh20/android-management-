import { Component, Input } from '@angular/core';
import { TableColumn, STATUS_DOT_STYLES, BADGE_STYLES, BADGE_ICON_STYLES } from './data-table.model';

@Component({
  selector: 'app-data-table',
  standalone: false,
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];

  getStatusDotClass(value: string): string {
    return STATUS_DOT_STYLES[(value || '').toLowerCase()] || 'bg-[#64748b]';
  }

  getBadgeClass(value: string): string {
    return BADGE_STYLES[(value || '').toLowerCase()] || 'bg-[#64748b]/15 text-[#94a3b8] ring-1 ring-[#64748b]/20';
  }

  getBadgeIcon(value: string): string {
    return BADGE_ICON_STYLES[(value || '').toLowerCase()] || '';
  }
}