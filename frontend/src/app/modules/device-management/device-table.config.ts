import { TableColumn } from '../../shared/components/data-table/data-table.model';

export const DEVICE_TABLE_COLUMNS: TableColumn[] = [
  { key: 'name', label: 'Device Name', type: 'text' },
  { key: 'serialNumber', label: 'Serial Number', type: 'text' },
  { key: 'macAddress', label: 'MAC Address', type: 'text' },
  { key: 'organizationName', label: 'Organization', type: 'text' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'appVersion', label: 'App Version', type: 'badge' },
  { key: 'lastSeenLabel', label: 'Last Seen', type: 'text' },
];