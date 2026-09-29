export type OrganizationType = 'distributor' | 'reseller' | 'partner';
export type OrganizationStatus = 'active' | 'inactive';

export interface Organization {
  id: number;
  name: string;
  ownerName: string;
  parentLabel: string;
  type: OrganizationType;
  status: OrganizationStatus;
  childrenCount: number;
  usageDevices: number;
  usageDevicesLimit: number;
  usageUsers: number;
  usageUsersLimit: number;
  createdLabel: string;
}