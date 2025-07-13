# EMS Pro Frontend Development Guide

This guide covers the development setup, coding standards, and best practices for the EMS Pro frontend application.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm 9+ or yarn 1.22+
- Git

### Setup

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
   # Edit .env.local with your configuration
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

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

### shadcn/ui Components

The project uses shadcn/ui components. To add a new component:

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### Custom Components

When creating custom components:

1. **Use TypeScript interfaces**
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'secondary'
     size?: 'sm' | 'md' | 'lg'
     children: React.ReactNode
   }
   ```

2. **Follow naming conventions**
   - Components: PascalCase (e.g., `UserProfile.tsx`)
   - Files: kebab-case (e.g., `user-profile.tsx`)
   - Functions: camelCase (e.g., `handleSubmit`)

3. **Use proper prop types**
   ```tsx
   const Button: React.FC<ButtonProps> = ({ 
     variant = 'primary', 
     size = 'md', 
     children 
   }) => {
     // Component implementation
   }
   ```

## 🔧 Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript check

# Testing
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage

# Utilities
npm run format       # Format code with Prettier
npm run clean        # Clean build artifacts
```

## 🧪 Testing

### Writing Tests

1. **Component Tests**
   ```tsx
   import { render, screen } from '@testing-library/react'
   import { Button } from './Button'

   describe('Button', () => {
     it('renders correctly', () => {
       render(<Button>Click me</Button>)
       expect(screen.getByText('Click me')).toBeInTheDocument()
     })
   })
   ```

2. **Hook Tests**
   ```tsx
   import { renderHook } from '@testing-library/react'
   import { useLocalStorage } from './useLocalStorage'

   describe('useLocalStorage', () => {
     it('returns initial value', () => {
       const { result } = renderHook(() => useLocalStorage('test', 'initial'))
       expect(result.current[0]).toBe('initial')
     })
   })
   ```

### Test Coverage

- Aim for 80%+ test coverage
- Test user interactions and edge cases
- Mock external dependencies

## 📝 Code Standards

### TypeScript

1. **Use strict mode**
   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

2. **Define proper types**
   ```tsx
   interface User {
     id: string
     name: string
     email: string
   }
   ```

3. **Avoid `any` type**
   ```tsx
   // ❌ Bad
   const data: any = response.data

   // ✅ Good
   const data: User = response.data
   ```

### React

1. **Use functional components**
   ```tsx
   // ✅ Good
   const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
     return <div>{user.name}</div>
   }
   ```

2. **Use hooks properly**
   ```tsx
   // ✅ Good
   const [count, setCount] = useState(0)
   const [user, setUser] = useState<User | null>(null)
   ```

3. **Handle side effects**
   ```tsx
   useEffect(() => {
     const fetchUser = async () => {
       const user = await api.getUser(id)
       setUser(user)
     }
     fetchUser()
   }, [id])
   ```

### Styling

1. **Use Tailwind CSS classes**
   ```tsx
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
   ```

2. **Use CSS variables for theming**
   ```css
   :root {
     --primary-color: #3b82f6;
     --secondary-color: #8b5cf6;
   }
   ```

3. **Follow responsive design**
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   ```

## 🔐 Authentication

### JWT Tokens

1. **Store tokens securely**
   ```tsx
   localStorage.setItem('authToken', token)
   ```

2. **Handle token expiration**
   ```tsx
   api.interceptors.response.use(
     response => response,
     error => {
       if (error.response?.status === 401) {
         localStorage.removeItem('authToken')
         window.location.href = '/login'
       }
       return Promise.reject(error)
     }
   )
   ```

### Role-based Access

```tsx
const ProtectedRoute: React.FC<{ roles: string[] }> = ({ roles, children }) => {
  const { user } = useAuth()
  
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />
  }
  
  return <>{children}</>
}
```

## 📊 State Management

### React Query

1. **Define queries**
   ```tsx
   const { data: users, isLoading } = useQuery({
     queryKey: ['users'],
     queryFn: () => api.getUsers()
   })
   ```

2. **Handle mutations**
   ```tsx
   const mutation = useMutation({
     mutationFn: (user: User) => api.createUser(user),
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ['users'] })
     }
   })
   ```

### Context API

```tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}
```

## 🚀 Performance

### Code Splitting

```tsx
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Employees = lazy(() => import('./pages/Employees'))

// Wrap with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### Image Optimization

```tsx
<img 
  src="/images/avatar.jpg" 
  alt="User avatar"
  loading="lazy"
  width={100}
  height={100}
/>
```

### Bundle Optimization

1. **Use dynamic imports**
   ```tsx
   const HeavyComponent = lazy(() => import('./HeavyComponent'))
   ```

2. **Tree shaking**
   ```tsx
   import { Button } from '@/components/ui/button'
   // Instead of importing entire library
   ```

## 🔍 Debugging

### React DevTools

Install React DevTools browser extension for component inspection.

### Redux DevTools

For state management debugging (if using Redux).

### Network Tab

Use browser's Network tab to debug API calls.

### Console Logging

```tsx
console.log('User data:', user)
console.error('API error:', error)
console.warn('Deprecated feature used')
```

## 📦 Building

### Production Build

```bash
npm run build
```

### Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.ems-pro.com
VITE_WS_URL=wss://api.ems-pro.com
```

### Bundle Analysis

```bash
npm run build -- --analyze
```

## 🚀 Deployment

### Vercel

1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables

### Docker

```bash
docker build -t ems-pro-frontend .
docker run -p 3000:3000 ems-pro-frontend
```

## 🤝 Contributing

1. **Create feature branch**
   ```bash
   git checkout -b feature/user-profile
   ```

2. **Make changes**
   - Follow coding standards
   - Add tests
   - Update documentation

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add user profile component"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/user-profile
   ```

### Commit Message Format

```
type(scope): description

feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: add tests
chore: maintenance tasks
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Query](https://tanstack.com/query/latest)
- [Vite](https://vitejs.dev/) 