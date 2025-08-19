import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { SocialAuthButtons } from '../components/auth/SocialAuthButtons';
import { loginSchema, LoginFormData } from '../schemas/validation';

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({
        data: {
          type: "email_account",
          attributes: {
            email: data.email,
            password: data.password
          }
        }
      });
      navigate('/dashboard');
    } catch (error) {
      // Error is handled by the interceptor
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 via-white to-honey-50 flex items-center justify-center p-4 bg-animated">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-secondary-100 animate-scale-in relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-honey-500 rounded-full mb-4">
              <LogIn className="w-8 h-8 text-charcoal-900" />
            </div>
            <h1 className="text-2xl font-bold text-charcoal-900 mb-2">Welcome back</h1>
            <p className="text-charcoal-600">Sign in to your account to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register('password')}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-between">
              <Link 
                to="/forgot-password"
                className="text-sm text-honey-600 hover:text-honey-700 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full bg-honey-500 text-charcoal-900 hover:bg-honey-400"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              Sign in
            </Button>
          </form>

          {/* Social Authentication */}
          <div className="mt-6">
            <SocialAuthButtons />
          </div>

          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className="text-charcoal-600">
              Don't have an account?{' '}
              <Link 
                to="/register"
                className="text-honey-600 hover:text-honey-700 font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link 
            to="/"
            className="inline-flex items-center text-charcoal-500 hover:text-charcoal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};