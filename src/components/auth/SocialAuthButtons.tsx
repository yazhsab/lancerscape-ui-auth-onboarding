import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { LinkedInApi } from 'react-linkedin-login';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export const SocialAuthButtons: React.FC = () => {
  const { socialAuth } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // Decode the JWT token to get user info
      const decoded = JSON.parse(atob(credentialResponse.credential.split('.')[1]));
      
      await socialAuth({
        data: {
          type: "social_account",
          attributes: {
            email: decoded.email,
            password: 'google-auth',
            unique_auth_id: decoded.sub
          }
        }
      });
    } catch (error) {
      toast.error('Google authentication failed');
    }
  };

  const handleLinkedInSuccess = async (data: any) => {
    try {
      await socialAuth({
        data: {
          type: "social_account",
          attributes: {
            email: data.email,
            password: 'linkedin-auth',
            unique_auth_id: data.id
          }
        }
      });
    } catch (error) {
      toast.error('LinkedIn authentication failed');
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error('Google authentication failed')}
          theme="outline"
          size="large"
          width="100%"
        />
        
        <LinkedInApi
          clientId="your-linkedin-client-id"
          redirectUri="http://localhost:5173/auth/linkedin/callback"
          onSuccess={handleLinkedInSuccess}
          onError={() => toast.error('LinkedIn authentication failed')}
        >
          {({ linkedInLogin }) => (
            <button
              onClick={linkedInLogin}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              Continue with LinkedIn
            </button>
          )}
        </LinkedInApi>
      </div>
    </div>
  );
};