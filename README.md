# LancerScape - Authentication & Onboarding Module

A modern, production-ready authentication and onboarding system for freelancing platforms built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

Visit the live application: [https://authentication-onboa-nxe7.bolt.host](https://authentication-onboa-nxe7.bolt.host)

## ✨ Features

### 🔐 Authentication System
- **Email/Password Authentication** - Secure login and registration
- **Google OAuth Integration** - One-click social authentication
- **Password Reset Flow** - Forgot password with email verification
- **Account Verification** - Email-based account activation
- **Protected Routes** - Route-level authentication guards
- **Token Management** - Automatic token refresh and validation
- **Session Persistence** - Remember user sessions across browser restarts

### 👤 User Onboarding
- **Role Selection** - Choose between Freelancer, Client, or Sponsor
- **Multi-step Registration** - Guided registration process
- **Profile Setup** - Complete user profile configuration
- **Email Verification** - Secure account activation workflow
- **Progress Tracking** - Visual progress indicators

### 🎨 User Interface
- **Modern Design** - Clean, professional bee-inspired theme
- **Responsive Layout** - Mobile-first design approach
- **Smooth Animations** - Subtle background animations and transitions
- **Accessibility** - WCAG compliant with proper focus management
- **Loading States** - Comprehensive loading and error states
- **Toast Notifications** - Real-time user feedback

### 🛡️ Security Features
- **Form Validation** - Client-side validation with Zod schemas
- **Password Strength** - Enforced password complexity requirements
- **CSRF Protection** - Cross-site request forgery protection
- **Secure Headers** - Security-first HTTP headers
- **Input Sanitization** - XSS protection on all inputs

### 🔧 Technical Features
- **TypeScript** - Full type safety throughout the application
- **React Router** - Client-side routing with protected routes
- **Context API** - Global state management for authentication
- **Axios Interceptors** - Automatic request/response handling
- **Error Boundaries** - Graceful error handling
- **Code Splitting** - Optimized bundle loading

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Routing**: React Router DOM v7
- **State Management**: React Context API with useReducer
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios with interceptors
- **Authentication**: Google OAuth + Custom JWT
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting (Netlify)

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lancerscape-auth-onboarding
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://ec2-3-238-114-176.compute-1.amazonaws.com:3000
   VITE_GOOGLE_CLIENT_ID=your-google-client-id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── auth/            # Authentication-specific components
│   │   ├── ProtectedRoute.tsx
│   │   └── SocialAuthButtons.tsx
│   └── common/          # Generic UI components
│       ├── Button.tsx
│       ├── Input.tsx
│       └── LoadingSpinner.tsx
├── contexts/            # React Context providers
│   └── AuthContext.tsx  # Authentication state management
├── lib/                 # Utility libraries
│   └── axios.ts         # HTTP client configuration
├── pages/               # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── RoleSelectionPage.tsx
│   ├── VerificationPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── ResetPasswordPage.tsx
│   └── DashboardPage.tsx
├── schemas/             # Validation schemas
│   └── validation.ts    # Zod schemas for forms
├── services/            # API service layer
│   └── auth.service.ts  # Authentication API calls
├── types/               # TypeScript type definitions
│   └── api.ts           # API response types
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles and animations
```

## 🎨 Design System

### Color Palette
- **Primary**: Bee Yellow (#FDB813) - CTAs, highlights, active states
- **Charcoal**: Black/Gray (#222222, #333333) - Text, headers
- **Secondary**: Light Gray (#F5F5F5, #EDEDED) - Backgrounds, cards
- **Accent**: Honey Orange (#FF9800) - Complementary warmth
- **Success**: Soft Green (#6BAA75) - Success states, nature balance

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Line Heights**: 150% for body text, 120% for headings

### Spacing System
- **Base Unit**: 8px
- **Scale**: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px

## 🔌 API Integration

### Base Configuration
```typescript
const api = axios.create({
  baseURL: 'http://ec2-3-238-114-176.compute-1.amazonaws.com:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Authentication Endpoints
- `POST /login/login` - User login
- `POST /account/accounts` - User registration
- `POST /account/activation` - Account activation
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset confirmation
- `GET /auth/verify` - Token verification

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## 🚀 Deployment

### Automatic Deployment
The application is configured for automatic deployment to Bolt Hosting (Netlify).

### Manual Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting provider
3. Configure environment variables on your hosting platform

## 🔧 Configuration

### Environment Variables
- `VITE_API_BASE_URL` - Backend API base URL
- `VITE_GOOGLE_CLIENT_ID` - Google OAuth client ID

### Tailwind Configuration
Custom design system configured in `tailwind.config.js` with:
- Extended color palette
- Custom animations
- Responsive breakpoints
- Typography scale

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic commit messages
- Maintain test coverage above 80%
- Follow the existing code style
- Update documentation for new features

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation in `CODE_WALKTHROUGH.md`

## 🎯 Roadmap

### Upcoming Features
- [ ] Two-factor authentication (2FA)
- [ ] LinkedIn OAuth integration
- [ ] Advanced profile customization
- [ ] Email template customization
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA) features
- [ ] Advanced analytics dashboard

### Performance Improvements
- [ ] Code splitting optimization
- [ ] Image lazy loading
- [ ] Service worker implementation
- [ ] Bundle size optimization

---

Built with ❤️ by the LancerScape team