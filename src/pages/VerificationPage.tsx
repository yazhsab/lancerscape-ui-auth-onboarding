import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, CheckCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '../components/common/Button';
import { AuthService } from '../services/auth.service';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

export const VerificationPage: React.FC = () => {
  const [isActivating, setIsActivating] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleActivation = async () => {
    setIsActivating(true);
    try {
      await AuthService.activateAccount();
      toast.success('Account activated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Activation failed. Please try again.');
    } finally {
      setIsActivating(false);
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      // API call to resend verification email
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
      toast.success('Verification email sent!');
      setCountdown(60);
    } catch (error) {
      toast.error('Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4 bg-animated">
      {/* Floating Background Shapes */}
      <div className="floating-shapes">
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
        <div className="floating-shape"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100 text-center animate-scale-in relative z-10">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <Mail className="w-10 h-10 text-blue-600" />
          </div>

          {/* Content */}
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Check your email</h1>
          <p className="text-gray-600 mb-6">
            We've sent a verification link to{' '}
            <span className="font-medium text-gray-900">{user?.email}</span>
          </p>

          {/* Verification Steps */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-medium text-gray-900 mb-3">Next steps:</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Check your email inbox
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                Click the verification link
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <div className="w-4 h-4 border-2 border-gray-300 rounded-full mr-2 flex-shrink-0"></div>
                Complete your profile setup
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleActivation}
              loading={isActivating}
              className="w-full"
            >
              I've clicked the link
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={handleResendEmail}
              loading={isResending}
              disabled={countdown > 0}
              className="w-full"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              {countdown > 0 ? `Resend in ${countdown}s` : 'Resend email'}
            </Button>
          </div>

          {/* Help text */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              <strong>Didn't receive the email?</strong><br />
              Check your spam folder or contact support if you continue having issues.
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate('/register')}
            className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to registration
          </button>
        </div>
      </div>
    </div>
  );
};