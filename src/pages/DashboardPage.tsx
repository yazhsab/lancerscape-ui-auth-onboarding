import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/common/Button';
import { LogOut, User, Mail, Phone, Shield } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'freelancer':
        return <User className="w-5 h-5" />;
      case 'client':
        return <Shield className="w-5 h-5" />;
      case 'sponsor':
        return <Shield className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'freelancer':
        return 'bg-blue-100 text-blue-800';
      case 'client':
        return 'bg-green-100 text-green-800';
      case 'sponsor':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl">
          {/* Welcome Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome, {user?.first_name}! 👋
            </h2>
            <p className="text-gray-600 mb-6">
              Your account has been successfully created and you're ready to start your journey on our platform.
            </p>
            
            {/* Account Status */}
            <div className="flex items-center space-x-2 mb-6">
              <div className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${user?.is_activated ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
              `}>
                {user?.is_activated ? 'Account Verified' : 'Pending Verification'}
              </div>
              
              <div className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
                ${getRoleColor(user?.role || '')}
              `}>
                {getRoleIcon(user?.role || '')}
                <span className="ml-1 capitalize">{user?.role}</span>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Profile Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-900">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email Address</p>
                  <p className="font-medium text-gray-900">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Account Role</p>
                  <p className="font-medium text-gray-900 capitalize">{user?.role}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <Button variant="outline">
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};