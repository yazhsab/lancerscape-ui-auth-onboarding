import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, LoginRequest, RegisterRequest, SocialAuthRequest, ForgotPasswordRequest } from '../types/api';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-hot-toast';

interface AuthState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  socialAuth: (socialData: SocialAuthRequest) => Promise<void>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<void>;
  logout: () => void;
  loadProfile: () => Promise<void>;
}

type AuthAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'LOGOUT' };

const initialState: AuthState = {
  user: null,
  loading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isAuthenticated: !!action.payload,
        loading: false 
      };
    case 'LOGOUT':
      return { 
        ...state, 
        user: null, 
        isAuthenticated: false,
        loading: false 
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (credentials: LoginRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await AuthService.login(credentials);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({ type: 'SET_USER', payload: response.user });
      toast.success('Login successful!');
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const register = async (userData: RegisterRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...backendData } = userData.data.attributes;
      const requestData = {
        data: {
          type: userData.data.type,
          attributes: backendData
        }
      };
      
      const response = await AuthService.register(requestData);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({ type: 'SET_USER', payload: response.user });
      toast.success('Registration successful!');
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const socialAuth = async (socialData: SocialAuthRequest): Promise<void> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await AuthService.socialAuth(socialData);
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      dispatch({ type: 'SET_USER', payload: response.user });
      toast.success('Social authentication successful!');
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      throw error;
    }
  };

  const forgotPassword = async (data: ForgotPasswordRequest): Promise<void> => {
    try {
      await AuthService.requestPasswordReset(data);
      toast.success('Password reset email sent!');
    } catch (error) {
      throw error;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
    toast.success('Logged out successfully');
  };

  const loadProfile = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }

      const profile = await AuthService.getProfile();
      dispatch({ type: 'SET_USER', payload: profile });
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      dispatch({ type: 'LOGOUT' });
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        try {
          const user = JSON.parse(storedUser);
          dispatch({ type: 'SET_USER', payload: user });
          await loadProfile();
        } catch (error) {
          logout();
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    initAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    socialAuth,
    forgotPassword,
    logout,
    loadProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};