import React, { useState, useEffect } from 'react';
import { AlertTriangle, Wifi, WifiOff, CheckCircle } from 'lucide-react';

export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [apiStatus, setApiStatus] = useState<'checking' | 'connected' | 'error'>('checking');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Test API connectivity
    const testApiConnection = async () => {
      try {
        const response = await fetch('/api/account/accounts/country_code_and_flag');
        if (response.ok || response.status === 404) {
          setApiStatus('connected');
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        setApiStatus('error');
      }
    };

    testApiConnection();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <WifiOff className="w-4 h-4" />
        <span>No internet connection</span>
      </div>
    );
  }

  if (apiStatus === 'connected') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in">
        <CheckCircle className="w-4 h-4" />
        <span className="text-sm">API Connected</span>
      </div>
    );
  }

  if (apiStatus === 'error') {
    return (
      <div className="fixed top-4 left-4 right-4 z-50 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">API Connection Error</p>
            <p className="text-sm mt-1">
              Unable to connect to the backend API. Please check if the backend server is running and accessible.
            </p>
            <button
              onClick={() => setApiStatus('checking')}
              className="text-sm underline mt-2 hover:no-underline"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};