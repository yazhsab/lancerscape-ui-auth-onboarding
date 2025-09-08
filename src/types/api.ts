export interface ApiResponse<T> {
  data: T;
  meta?: {
    token?: string;
    message?: string;
  };
  errors?: Array<{
    detail: string;
    source?: any;
  }>;
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
  type: string;
  attributes: {
    email: string;
    first_name: string;
    last_name: string;
    full_phone_number: string;
    is_activated: boolean;
    created_at: string;
    updated_at: string;
  };
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

export interface ForgotPasswordRequest {
  data: {
    email: string;
  };
}

export interface ResetPasswordRequest {
  data: {
    reset_password_token: string;
    password: string;
    password_confirmation: string;
  };
}

export interface ProfileUpdateRequest {
  data: {
    first_name?: string;
    last_name?: string;
    new_phone_number?: string;
    current_password?: string;
    new_password?: string;
  };
}

export interface CountryCode {
  country_name: string;
  country_code: string;
  flag_url: string;
}