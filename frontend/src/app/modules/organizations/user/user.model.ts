export type UserStatus = 'verified' | 'unverified';

export interface UserRecord {
  id: string;
  email: string;
  organizationName: string;
  role: string;
  status: UserStatus;
  online: boolean;
  lastSeenLabel: string;
  lastSignInLabel: string;
  protected: boolean;
}