export type RoleStatus = 'active' | 'inactive';

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  usersAssigned: number;
  status: RoleStatus;
}