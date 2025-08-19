import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Briefcase, Star } from 'lucide-react';
import { Button } from '../components/common/Button';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="bg-charcoal-900/95 backdrop-blur-sm border-b border-charcoal-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-honey-500 rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-charcoal-900" />
              </div>
              <span className="text-xl font-bold text-white">LancerScape</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:bg-charcoal-800">Sign in</Button>
              </Link>
              <Link to="/register">
                <Button className="bg-honey-500 text-charcoal-900 hover:bg-honey-400">Get started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal-900 mb-6">
            Connect with{' '}
            <span className="bg-gradient-to-r from-honey-500 to-accent-500 bg-clip-text text-transparent">
              talented freelancers
            </span>
          </h1>
          <p className="text-xl text-charcoal-700 mb-8 max-w-3xl mx-auto">
            Join the world's largest freelancing platform where businesses and independent professionals connect and collaborate remotely.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="px-8 bg-honey-500 text-charcoal-900 hover:bg-honey-400">
                Get started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="px-8 border-charcoal-900 text-charcoal-900 hover:bg-charcoal-50">
                Sign in
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-secondary-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-honey-100 rounded-full mb-4">
                <Users className="w-6 h-6 text-honey-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">Find Talent</h3>
              <p className="text-charcoal-600">
                Discover skilled freelancers from around the world ready to bring your projects to life.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-secondary-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-accent-100 rounded-full mb-4">
                <Briefcase className="w-6 h-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">Grow Your Business</h3>
              <p className="text-charcoal-600">
                Scale your business with access to a global pool of talented professionals.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-secondary-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-success-100 rounded-full mb-4">
                <Star className="w-6 h-6 text-success-600" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">Quality Work</h3>
              <p className="text-charcoal-600">
                Get high-quality work delivered on time with our secure payment protection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};