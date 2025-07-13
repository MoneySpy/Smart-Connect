// User types
export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'manager' | 'user'
  avatar?: string
  department?: string
  position?: string
  phone?: string
  address?: string
  hireDate?: string
  salary?: number
  status: 'active' | 'inactive' | 'suspended'
  createdAt: string
  updatedAt: string
}

// Employee types
export interface Employee {
  id: string
  userId: string
  employeeId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  hireDate: string
  salary: number
  managerId?: string
  status: 'active' | 'inactive' | 'terminated'
  avatar?: string
  address?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
  skills?: string[]
  certifications?: string[]
  createdAt: string
  updatedAt: string
}

// Schedule types
export interface Schedule {
  id: string
  employeeId: string
  date: string
  startTime: string
  endTime: string
  breakTime: number
  type: 'regular' | 'overtime' | 'holiday' | 'sick' | 'vacation'
  status: 'scheduled' | 'in-progress' | 'completed' | 'absent'
  notes?: string
  createdAt: string
  updatedAt: string
}

// Leave types
export interface Leave {
  id: string
  employeeId: string
  type: 'sick' | 'vacation' | 'personal' | 'maternity' | 'paternity' | 'bereavement'
  startDate: string
  endDate: string
  days: number
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'cancelled'
  approvedBy?: string
  approvedAt?: string
  rejectionReason?: string
  createdAt: string
  updatedAt: string
}

// Department types
export interface Department {
  id: string
  name: string
  description?: string
  managerId?: string
  budget?: number
  location?: string
  createdAt: string
  updatedAt: string
}

// Position types
export interface Position {
  id: string
  title: string
  departmentId: string
  description?: string
  requirements?: string[]
  salaryRange?: {
    min: number
    max: number
  }
  createdAt: string
  updatedAt: string
}

// Chat types
export interface ChatMessage {
  id: string
  roomId: string
  senderId: string
  content: string
  type: 'text' | 'file' | 'image' | 'system'
  timestamp: string
  readBy: string[]
}

export interface ChatRoom {
  id: string
  name: string
  type: 'direct' | 'group'
  participants: string[]
  lastMessage?: ChatMessage
  createdAt: string
  updatedAt: string
}

// Report types
export interface Report {
  id: string
  type: 'attendance' | 'performance' | 'payroll' | 'leave' | 'custom'
  title: string
  description?: string
  parameters: Record<string, any>
  generatedBy: string
  status: 'pending' | 'generating' | 'completed' | 'failed'
  fileUrl?: string
  createdAt: string
  updatedAt: string
}

// Analytics types
export interface AnalyticsData {
  period: string
  metrics: {
    totalEmployees: number
    activeEmployees: number
    newHires: number
    terminations: number
    averageSalary: number
    totalPayroll: number
    attendanceRate: number
    leaveRequests: number
  }
  trends: {
    employeeGrowth: number[]
    salaryTrends: number[]
    attendanceTrends: number[]
    leaveTrends: number[]
  }
}

// Notification types
export interface Notification {
  id: string
  userId: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  actionUrl?: string
  createdAt: string
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  email: string
  password: string
  confirmPassword: string
  name: string
  role?: 'user'
}

export interface EmployeeForm {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  position: string
  hireDate: string
  salary: number
  managerId?: string
  address?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

// Filter and Search types
export interface FilterOptions {
  department?: string
  position?: string
  status?: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface SearchParams {
  query?: string
  filters?: FilterOptions
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
} 