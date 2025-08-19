import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { VerificationPage } from './pages/VerificationPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  return (
    <GoogleOAuthProvider clientId="your-google-client-id">
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              
              {/* Auth Routes - Redirect if already authenticated */}
              <Route path="/login" element={
                <ProtectedRoute requireAuth={false}>
                  <LoginPage />
                </ProtectedRoute>
              } />
              
              <Route path="/register" element={
                <ProtectedRoute requireAuth={false}>
                  <RegisterPage />
                </ProtectedRoute>
              } />
              
              <Route path="/register/role" element={
                <ProtectedRoute>
                  <RoleSelectionPage />
                </ProtectedRoute>
              } />
              
              <Route path="/register/verify" element={
                <ProtectedRoute>
                  <VerificationPage />
                </ProtectedRoute>
              } />
              
              <Route path="/forgot-password" element={
                <ProtectedRoute requireAuth={false}>
                  <ForgotPasswordPage />
                </ProtectedRoute>
              } />
              
              <Route path="/reset-password/:token" element={
                <ProtectedRoute requireAuth={false}>
                  <ResetPasswordPage />
                </ProtectedRoute>
              } />

              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } />

              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>

            {/* Toast Notifications */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                  borderRadius: '12px',
                  padding: '16px',
                },
                success: {
                  iconTheme: {
                    primary: '#10B981',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#EF4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;