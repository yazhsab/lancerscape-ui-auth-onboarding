import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, ArrowLeft, Check } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { AuthService } from '../services/auth.service';
import { resetPasswordSchema, ResetPasswordFormData } from '../schemas/validation';
import { toast } from 'react-hot-toast';

export const ResetPasswordPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema)
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error('Invalid reset token');
      return;
    }

    try {
      await AuthService.resetPassword({
        token,
        password: data.password,
        confirmPassword: data.confirmPassword
      });
      toast.success('Password reset successful!');
      navigate('/login');
    } catch (error) {
      // Error is handled by the interceptor
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4 bg-animated">
        {/* Floating Background Shapes */}
        <div className="floating-shapes">
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
          <div className="floating-shape"></div>
        </div>

        <div className="w-full max-w-md text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 animate-scale-in relative z-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Reset Link</h1>
            <p className="text-gray-600 mb-6">
              This password reset link is invalid or has expired.
            </p>
            <Link to="/forgot-password">
              <Button>Request New Reset Link</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4 bg-animated">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 animate-scale-in relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset your password</h1>
            <p className="text-gray-600">Choose a new password for your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="New password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register('password')}
              error={errors.password?.message}
            />

            <Input
              label="Confirm new password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your new password"
              showPasswordToggle
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              <Check className="w-4 h-4 mr-2" />
              Reset password
            </Button>
          </form>

          {/* Back to login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Remember your password?{' '}
              <Link 
                to="/login"
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link 
            to="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};