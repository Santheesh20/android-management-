export interface ProfileRole {
  id: string;
  name: string;
  code: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  role: ProfileRole;
  permissionIds: string[];
  mustChangePassword: boolean;
}