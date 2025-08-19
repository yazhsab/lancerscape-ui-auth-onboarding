import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase, Heart, ArrowRight } from 'lucide-react';
import { Button } from '../components/common/Button';

type Role = 'freelancer' | 'client' | 'sponsor';

interface RoleOption {
  id: Role;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

export const RoleSelectionPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const roles: RoleOption[] = [
    {
      id: 'freelancer',
      title: 'Freelancer',
      description: 'Offer your skills and find amazing projects',
      icon: <Users className="w-8 h-8" />,
      features: [
        'Create a professional profile',
        'Browse and apply to projects',
        'Manage your portfolio',
        'Track earnings and payments'
      ]
    },
    {
      id: 'client',
      title: 'Client',
      description: 'Hire talented freelancers for your projects',
      icon: <Briefcase className="w-8 h-8" />,
      features: [
        'Post projects and requirements',
        'Browse freelancer profiles',
        'Manage project milestones',
        'Secure payment processing'
      ]
    },
    {
      id: 'sponsor',
      title: 'Sponsor',
      description: 'Support and invest in promising projects',
      icon: <Heart className="w-8 h-8" />,
      features: [
        'Discover innovative projects',
        'Support creative initiatives',
        'Track investment progress',
        'Connect with entrepreneurs'
      ]
    }
  ];

  const handleRoleSelection = (role: Role) => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;
    
    setIsSubmitting(true);
    try {
      // Store role selection in localStorage for now
      localStorage.setItem('selectedRole', selectedRole);
      navigate('/register/verify');
    } catch (error) {
      console.error('Role selection failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose your role</h1>
          <p className="text-xl text-gray-600">How do you want to use our platform?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => handleRoleSelection(role.id)}
              className={`
                relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform hover:scale-105
                ${selectedRole === role.id 
                  ? 'border-blue-500 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              {selectedRole === role.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`
                inline-flex items-center justify-center w-16 h-16 rounded-full mb-4
                ${selectedRole === role.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                {role.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
              <p className="text-gray-600 mb-4">{role.description}</p>
              
              <ul className="space-y-2">
                {role.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2 flex-shrink-0"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-4">
          <Button
            variant="outline"
            onClick={() => navigate('/register')}
            className="px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleContinue}
            disabled={!selectedRole}
            loading={isSubmitting}
            className="px-8"
          >
            Continue
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};