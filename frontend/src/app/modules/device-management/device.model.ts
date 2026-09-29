export type DeviceStatus = 'online' | 'offline';

export interface Device {
  id: number;
  name: string;
  serialNumber: string;
  macAddress: string;
  organizationName: string;
  status: DeviceStatus;
  appVersion: string;
  lastSeenLabel: string;
}