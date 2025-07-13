# EMS PRO - Advanced Employee Management System

ระบบจัดการพนักงานขั้นสูงที่มาพร้อมกับ AI-powered insights, real-time collaboration, และ comprehensive workforce analytics

## 🚀 Features

### 🔐 Authentication & Authorization
- **Role-based Access Control**: Admin, Manager, User
- **Secure Login/Register**: ด้วย form validation และ error handling
- **Session Management**: Automatic token validation และ logout
- **Mock Data Support**: สำหรับการทดสอบระบบ

### 📊 Role-based Dashboards
- **Admin Dashboard**: จัดการระบบทั้งหมด, สถิติองค์กร, แผงควบคุม
- **Manager Dashboard**: จัดการทีม, ติดตามผลงาน, รายงาน
- **User Dashboard**: ข้อมูลส่วนตัว, สถิติงาน, เมนูหลัก

### 🎨 Modern UI/UX
- **Responsive Design**: รองรับทุกขนาดหน้าจอ
- **Dark/Light Theme**: สลับธีมได้ตามต้องการ
- **Thai/Isan Theme**: ออกแบบสำหรับผู้ใช้ไทย
- **Beautiful Graphics**: ใช้ gradient และ modern design

### 🔧 Technical Features
- **React 18**: ด้วย TypeScript
- **Vite**: Fast development และ build
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Context API**: State management
- **PWA Ready**: Progressive Web App support

## 🛠️ Installation

### Prerequisites
- Node.js 18+ 
- npm หรือ yarn

### Setup
```bash
# Clone repository
git clone <repository-url>
cd yourproject

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
สร้างไฟล์ `.env` ใน frontend directory:
```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=EMS PRO
VITE_APP_VERSION=1.0.0
```

## 🧪 Testing

### Demo Accounts
ระบบมาพร้อมกับบัญชีทดสอบ:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@emspro.com | password123 |
| Manager | manager@emspro.com | password123 |
| User | user@emspro.com | password123 |

### Features Testing
1. **Login/Register**: ทดสอบการเข้าสู่ระบบและสมัครสมาชิก
2. **Role-based Access**: ทดสอบการเข้าถึงหน้าที่แตกต่างกันตาม role
3. **Dashboard Navigation**: ทดสอบการนำทางใน dashboard
4. **Theme Toggle**: ทดสอบการสลับธีม
5. **Responsive Design**: ทดสอบบนหน้าจอขนาดต่างๆ

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Navigation bar
│   │   │   ├── Sidebar.tsx     # Sidebar navigation
│   │   │   └── Footer.tsx      # Footer component
│   │   └── ui/                 # UI components
│   ├── contexts/
│   │   ├── AuthContext.tsx     # Authentication context
│   │   ├── ThemeContext.tsx    # Theme management
│   │   ├── NotificationContext.tsx # Notifications
│   │   └── SocketContext.tsx   # WebSocket connections
│   ├── pages/
│   │   ├── Login.tsx           # Login page
│   │   ├── Register.tsx        # Register page
│   │   ├── Dashboard.tsx       # Role-based dashboard
│   │   └── ...                 # Other pages
│   ├── hooks/                  # Custom hooks
│   ├── services/               # API services
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Main app component
│   └── main.tsx               # App entry point
├── public/                     # Static assets
├── package.json               # Dependencies
└── vite.config.ts            # Vite configuration
```

## 🎯 Key Components

### Authentication System
- **AuthContext**: จัดการ authentication state
- **Protected Routes**: ป้องกันการเข้าถึงหน้าที่ไม่ได้รับอนุญาต
- **Role-based Redirects**: redirect ไปยัง dashboard ที่เหมาะสม

### Dashboard System
- **Dynamic Content**: แสดงเนื้อหาตาม role ของผู้ใช้
- **Real-time Data**: แสดงข้อมูลแบบ real-time
- **Interactive Elements**: ปุ่มและลิงก์ที่ใช้งานได้

### Navigation System
- **Responsive Navbar**: ปรับตัวตามขนาดหน้าจอ
- **Mobile Sidebar**: สำหรับอุปกรณ์มือถือ
- **Active States**: แสดงหน้าที่กำลังใช้งานอยู่

## 🔒 Security Features

- **Form Validation**: ตรวจสอบข้อมูลก่อนส่ง
- **Error Handling**: จัดการข้อผิดพลาดอย่างเหมาะสม
- **Session Management**: จัดการ session อย่างปลอดภัย
- **Role-based Access**: จำกัดการเข้าถึงตามสิทธิ์

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Secondary**: Purple (#8B5CF6)
- **Success**: Green (#10B981)
- **Warning**: Yellow (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Font Family**: Inter, system fonts
- **Responsive**: ปรับขนาดตามหน้าจอ
- **Thai Support**: รองรับภาษาไทย

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📈 Performance

- **Lazy Loading**: โหลดคอมโพเนนต์เมื่อจำเป็น
- **Code Splitting**: แบ่งโค้ดเป็นส่วนๆ
- **Image Optimization**: ปรับขนาดรูปภาพอัตโนมัติ
- **Caching**: ใช้ cache เพื่อเพิ่มความเร็ว

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

### Code Quality
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

หากมีปัญหาหรือคำถาม:
- สร้าง Issue ใน GitHub
- ติดต่อทีมพัฒนา
- ดู Documentation เพิ่มเติม

## 🎉 Acknowledgments

- React Team สำหรับ React 18
- Vite Team สำหรับ build tool ที่เร็ว
- Tailwind CSS Team สำหรับ CSS framework
- ชุมชน open source ทั้งหมด

---

**EMS PRO** - ระบบจัดการพนักงานแห่งอนาคต 🚀 