import React, { useState, useEffect } from 'react';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';

export const NetworkStatus: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showMixedContentWarning, setShowMixedContentWarning] = useState(false);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check for mixed content issues
    const isHTTPS = window.location.protocol === 'https:';
    const backendIsHTTP = import.meta.env.VITE_API_BASE_URL?.startsWith('http://') || 
                         !import.meta.env.VITE_API_BASE_URL?.startsWith('https://');
    
    if (isHTTPS && backendIsHTTP) {
      setShowMixedContentWarning(true);
    }

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

  if (showMixedContentWarning) {
    return (
      <div className="fixed top-4 left-4 right-4 z-50 bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg">
        <div className="flex items-start space-x-2">
          <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="font-medium">Mixed Content Warning</p>
            <p className="text-sm mt-1">
              This HTTPS site cannot connect to the HTTP backend due to browser security restrictions. 
              For full functionality, please access the site via HTTP or configure HTTPS on the backend.
            </p>
            <button 
              onClick={() => setShowMixedContentWarning(false)}
              className="text-sm underline mt-2 hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};