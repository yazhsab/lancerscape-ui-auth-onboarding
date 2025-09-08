import api from '../lib/axios';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  SocialAuthRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ProfileUpdateRequest,
  CountryCode,
  ApiResponse 
} from '../types/api';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<any>>('/login/login', credentials);
    return {
      user: response.data.data,
      token: response.data.meta?.token || ''
    };
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Transform the form data to match backend API structure
    const requestBody = {
      data: {
        type: "email_account",
        attributes: {
          first_name: userData.data.attributes.first_name,
          last_name: userData.data.attributes.last_name,
          full_phone_number: userData.data.attributes.full_phone_number,
          email: userData.data.attributes.email,
          password: userData.data.attributes.password
          // Note: confirmPassword is not sent to backend - it's only for frontend validation
        }
      }
    };
    
    const response = await api.post<ApiResponse<any>>('/account/accounts', requestBody);
    return {
      user: response.data.data,
      token: response.data.meta?.token || ''
    };
  }

  static async socialAuth(socialData: SocialAuthRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<any>>('/login/login', socialData);
    return {
      user: response.data.data,
      token: response.data.meta?.token || ''
    };
  }

  static async activateAccount(): Promise<void> {
    await api.get('/account/accounts/email_confirmation');
  }

  static async requestPasswordReset(data: ForgotPasswordRequest): Promise<void> {
    await api.post('/forgot_password/forgot_password', data);
  }

  static async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await api.post('/forgot_password/reset_password', data);
  }

  static async getProfile(): Promise<any> {
    const response = await api.get<ApiResponse<any>>('/profile/profile');
    return response.data.data;
  }

  static async updateProfile(data: ProfileUpdateRequest): Promise<any> {
    const response = await api.put<ApiResponse<any>>('/profile/profile', data);
    return response.data.data;
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.put('/profile/password', {
      data: {
        current_password: currentPassword,
        new_password: newPassword
      }
    });
  }

  static async validatePhoneChange(newPhoneNumber: string): Promise<void> {
    await api.post('/profile/change_phone_validation', {
      data: {
        new_phone_number: newPhoneNumber
      }
    });
  }

  static async getCountryCodes(): Promise<CountryCode[]> {
    const response = await api.get<ApiResponse<CountryCode[]>>('/account/accounts/country_code_and_flag');
    return response.data.data;
  }

  static async getValidationRules(): Promise<any> {
    const response = await api.get<ApiResponse<any>>('/profile/validations');
    return response.data.data;
  }
}