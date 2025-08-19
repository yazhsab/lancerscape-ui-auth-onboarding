import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserPlus, ArrowLeft, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { SocialAuthButtons } from '../components/auth/SocialAuthButtons';
import { registerSchema, RegisterFormData } from '../schemas/validation';

export const RegisterPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser({
        data: {
          type: "email_account",
          attributes: {
            first_name: data.first_name,
            last_name: data.last_name,
            full_phone_number: data.full_phone_number,
            email: data.email,
            password: data.password
          }
        }
      });
      navigate('/register/role');
    } catch (error) {
      // Error is handled by the interceptor
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p className="text-gray-600">Join our freelancing platform today</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First name"
                placeholder="John"
                {...register('first_name')}
                error={errors.first_name?.message}
              />
              <Input
                label="Last name"
                placeholder="Doe"
                {...register('last_name')}
                error={errors.last_name?.message}
              />
            </div>

            <Input
              label="Email address"
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <Input
              label="Phone number"
              type="tel"
              placeholder="+1234567890"
              {...register('full_phone_number')}
              error={errors.full_phone_number?.message}
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              showPasswordToggle
              onTogglePassword={() => setShowPassword(!showPassword)}
              {...register('password')}
              error={errors.password?.message}
            />

            <Input
              label="Confirm password"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              showPasswordToggle
              onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />

            {/* Terms checkbox */}
            <div className="flex items-start space-x-3">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  {...register('terms')}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
              <div className="text-sm">
                <label className="text-gray-700">
                  I agree to the{' '}
                  <Link to="/terms" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>
                </label>
                {errors.terms && (
                  <p className="text-red-600 mt-1">{errors.terms.message}</p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              <Check className="w-4 h-4 mr-2" />
              Create account
            </Button>
          </form>

          {/* Social Authentication */}
          <div className="mt-6">
            <SocialAuthButtons />
          </div>

          {/* Sign in link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
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