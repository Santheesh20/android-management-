export interface AuthRole {
  id: string;
  name: string;
  code: string;
}


export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: AuthRole;
  permissionIds: string[];
  mustChangePassword: boolean;
}


export interface LoginRequest {
  email: string;
  password: string;
}


export interface LoginResponse {
  success: boolean;
  message: string;

  data: {
    accessToken: string;
    tokenType: string;
    expiresIn: number;
    user: AuthUser;
  };
}


export interface RefreshResponse {
  success: boolean;
  message?: string;

  data: {
    accessToken: string;
    user: AuthUser;
  };
}


export interface MeResponse {
  success: boolean;
  message?: string;

  data: {
    user: AuthUser;
  };
}


export interface LogoutResponse {
  success: boolean;
  message: string;
}


export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}


export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}


export interface CsrfResponse {
  success: boolean;
  message: string;

  data: {
    csrfToken: string;
  };
}


export interface ApiErrorResponse {
  success: false;
  message: string;

  errors?: Array<{
    field: string;
    message: string;
  }>;
}