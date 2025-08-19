import api from '../lib/axios';
import { 
  LoginRequest, 
  RegisterRequest, 
  AuthResponse, 
  SocialAuthRequest,
  PasswordResetRequest,
  PasswordResetConfirm,
  ApiResponse 
} from '../types/api';

export class AuthService {
  static async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/login/login', credentials);
    return response.data.data;
  }

  static async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/account/accounts', userData);
    return response.data.data;
  }

  static async socialAuth(socialData: SocialAuthRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/login/login', socialData);
    return response.data.data;
  }

  static async activateAccount(token: string): Promise<void> {
    await api.post('/account/activation', { token });
  }

  static async requestPasswordReset(data: PasswordResetRequest): Promise<void> {
    await api.post('/auth/forgot-password', data);
  }

  static async resetPassword(data: PasswordResetConfirm): Promise<void> {
    await api.post('/auth/reset-password', data);
  }

  static async verifyToken(): Promise<AuthResponse> {
    const response = await api.get<ApiResponse<AuthResponse>>('/auth/verify');
    return response.data.data;
  }

  static async refreshToken(): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/refresh');
    return response.data.data;
  }
}