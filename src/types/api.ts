export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface LoginRequest {
  data: {
    type: "email_account" | "social_account";
    attributes: {
      email: string;
      password: string;
      unique_auth_id?: string;
    };
  };
}

export interface RegisterRequest {
  data: {
    type: "email_account";
    attributes: {
      first_name: string;
      last_name: string;
      full_phone_number: string;
      email: string;
      password: string;
    };
  };
}

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: 'freelancer' | 'client' | 'sponsor';
  is_activated: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SocialAuthRequest {
  data: {
    type: "social_account";
    attributes: {
      email: string;
      password: string;
      unique_auth_id: string;
    };
  };
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  password: string;
  confirmPassword: string;
}