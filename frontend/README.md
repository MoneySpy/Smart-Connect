# EMS Pro Frontend

A modern, responsive Employee Management System frontend built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Built with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript support
- **Real-time Updates**: WebSocket integration for live updates
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching support
- **PWA Ready**: Progressive Web App capabilities
- **Performance Optimized**: Code splitting and lazy loading
- **Accessibility**: WCAG compliant components
- **Internationalization**: Multi-language support ready

## 🛠 Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **State Management**: React Query + Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Real-time**: Socket.io Client
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Testing**: Vitest

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ems-pro/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001

# Authentication
VITE_AUTH_DOMAIN=your-auth-domain.auth0.com
VITE_AUTH_CLIENT_ID=your-auth-client-id
VITE_AUTH_AUDIENCE=your-auth-audience

# External Services
VITE_SENTRY_DSN=your-sentry-dsn
VITE_ANALYTICS_ID=your-analytics-id
VITE_LOG_ROCKET_ID=your-logrocket-id

# Feature Flags
VITE_ENABLE_AI_FEATURES=true
VITE_ENABLE_CHAT=true
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NOTIFICATIONS=true
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (shadcn/ui)
│   ├── layout/         # Layout components
│   └── forms/          # Form components
├── pages/              # Page components
├── hooks/              # Custom React hooks
├── contexts/           # React contexts
├── services/           # API services
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── assets/             # Static assets
└── styles/             # Global styles
```

## 🎨 UI Components

The project uses shadcn/ui components with custom styling. Key components include:

- **Button**: Various button styles and variants
- **Card**: Content containers with headers and footers
- **Dialog**: Modal dialogs and overlays
- **Form**: Form components with validation
- **Table**: Data tables with sorting and filtering
- **Chart**: Data visualization components
- **Navigation**: Sidebar and top navigation

## 🔐 Authentication

The app supports multiple authentication methods:

- **JWT Tokens**: Standard JWT authentication
- **OAuth**: Social login integration
- **Role-based Access**: Admin, Manager, User roles
- **Session Management**: Automatic token refresh

## 📱 Responsive Design

The application is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

Dark mode support with:

- **System Preference**: Automatic detection
- **Manual Toggle**: User-controlled switching
- **Persistent**: Remembers user preference

## ⚡ Performance

Performance optimizations include:

- **Code Splitting**: Route-based lazy loading
- **Bundle Optimization**: Tree shaking and minification
- **Image Optimization**: WebP format and lazy loading
- **Caching**: Service worker for offline support
- **Preloading**: Critical resource preloading

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## 🏗 Building for Production

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📊 Analytics & Monitoring

- **Performance Monitoring**: Web Vitals tracking
- **Error Tracking**: Sentry integration
- **User Analytics**: Google Analytics ready
- **Session Recording**: LogRocket integration

## 🔧 Development

### Code Style

The project uses ESLint and Prettier for code formatting:

```bash
# Lint code
npm run lint

# Format code
npm run format
```

### Git Hooks

Pre-commit hooks ensure code quality:

- Linting
- Type checking
- Test running
- Format checking

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables

### Docker

```bash
# Build Docker image
docker build -t ems-pro-frontend .

# Run container
docker run -p 3000:3000 ems-pro-frontend
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- **Documentation**: [Link to docs]
- **Issues**: [GitHub Issues]
- **Discussions**: [GitHub Discussions]
- **Email**: support@ems-pro.com

## 🔄 Changelog

### v1.0.0 (2024-01-01)
- Initial release
- Core employee management features
- Real-time chat and notifications
- Advanced analytics dashboard
- Mobile-responsive design 