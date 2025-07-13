import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API endpoints
export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: { email: string; password: string; name: string }) =>
    api.post('/auth/register', userData),
  validate: () => api.get('/auth/validate'),
  logout: () => api.post('/auth/logout'),
}

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
  getUsers: (params?: any) => api.get('/users', { params }),
  getUser: (id: string) => api.get(`/users/${id}`),
  createUser: (data: any) => api.post('/users', data),
  updateUser: (id: string, data: any) => api.put(`/users/${id}`, data),
  deleteUser: (id: string) => api.delete(`/users/${id}`),
}

export const employeeAPI = {
  getEmployees: (params?: any) => api.get('/employees', { params }),
  getEmployee: (id: string) => api.get(`/employees/${id}`),
  createEmployee: (data: any) => api.post('/employees', data),
  updateEmployee: (id: string, data: any) => api.put(`/employees/${id}`, data),
  deleteEmployee: (id: string) => api.delete(`/employees/${id}`),
  getEmployeeStats: () => api.get('/employees/stats'),
}

export const scheduleAPI = {
  getSchedules: (params?: any) => api.get('/schedules', { params }),
  getSchedule: (id: string) => api.get(`/schedules/${id}`),
  createSchedule: (data: any) => api.post('/schedules', data),
  updateSchedule: (id: string, data: any) => api.put(`/schedules/${id}`, data),
  deleteSchedule: (id: string) => api.delete(`/schedules/${id}`),
  getMySchedule: () => api.get('/schedules/my'),
}

export const leaveAPI = {
  getLeaves: (params?: any) => api.get('/leaves', { params }),
  getLeave: (id: string) => api.get(`/leaves/${id}`),
  createLeave: (data: any) => api.post('/leaves', data),
  updateLeave: (id: string, data: any) => api.put(`/leaves/${id}`, data),
  deleteLeave: (id: string) => api.delete(`/leaves/${id}`),
  approveLeave: (id: string) => api.post(`/leaves/${id}/approve`),
  rejectLeave: (id: string, reason: string) => api.post(`/leaves/${id}/reject`, { reason }),
}

export const reportAPI = {
  getReports: (params?: any) => api.get('/reports', { params }),
  generateReport: (type: string, params?: any) => api.post(`/reports/${type}`, params),
  getDashboardStats: () => api.get('/reports/dashboard-stats'),
  getAnalytics: (params?: any) => api.get('/reports/analytics', { params }),
}

export const chatAPI = {
  getMessages: (roomId: string) => api.get(`/chat/${roomId}/messages`),
  sendMessage: (roomId: string, message: string) => api.post(`/chat/${roomId}/messages`, { message }),
  getRooms: () => api.get('/chat/rooms'),
  createRoom: (data: any) => api.post('/chat/rooms', data),
}

export default api 