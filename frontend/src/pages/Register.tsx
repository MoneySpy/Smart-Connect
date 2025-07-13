import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useNotifications } from '../contexts/NotificationContext'

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    department: '',
    position: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { register } = useAuth()
  const { addNotification } = useNotifications()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) {
      newErrors.name = 'ชื่อเป็นสิ่งจำเป็น'
    }

    if (!formData.email) {
      newErrors.email = 'อีเมลเป็นสิ่งจำเป็น'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'รูปแบบอีเมลไม่ถูกต้อง'
    }

    if (!formData.password) {
      newErrors.password = 'รหัสผ่านเป็นสิ่งจำเป็น'
    } else if (formData.password.length < 6) {
      newErrors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'กรุณายืนยันรหัสผ่าน'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'รหัสผ่านไม่ตรงกัน'
    }

    if (!formData.department) {
      newErrors.department = 'กรุณาเลือกแผนก'
    }

    if (!formData.position) {
      newErrors.position = 'กรุณาเลือกตำแหน่ง'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await register({
        email: formData.email,
        password: formData.password,
        name: formData.name
      })
      
      addNotification({
        id: Date.now().toString(),
        type: 'success',
        message: 'สมัครสมาชิกสำเร็จ! ยินดีต้อนรับสู่ EMS PRO'
      })
      
      navigate('/dashboard')
    } catch (error) {
      addNotification({
        id: Date.now().toString(),
        type: 'error',
        message: 'สมัครสมาชิกไม่สำเร็จ กรุณาลองใหม่อีกครั้ง'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl text-white font-bold">EMS</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            สมัครสมาชิก EMS PRO
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            เข้าร่วมระบบจัดการพนักงานขั้นสูง
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ชื่อ-นามสกุล
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.name 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                }`}
                placeholder="ชื่อ-นามสกุล"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                อีเมล
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.email 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                }`}
                placeholder="your@email.com"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  แผนก
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.department 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  disabled={isLoading}
                >
                  <option value="">เลือกแผนก</option>
                  <option value="it">ไอที</option>
                  <option value="hr">ทรัพยากรบุคคล</option>
                  <option value="finance">การเงิน</option>
                  <option value="marketing">การตลาด</option>
                  <option value="sales">ขาย</option>
                  <option value="operations">ปฏิบัติการ</option>
                </select>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.department}</p>
                )}
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ตำแหน่ง
                </label>
                <select
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                    errors.position 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                  }`}
                  disabled={isLoading}
                >
                  <option value="">เลือกตำแหน่ง</option>
                  <option value="employee">พนักงาน</option>
                  <option value="senior">พนักงานอาวุโส</option>
                  <option value="supervisor">หัวหน้างาน</option>
                  <option value="manager">ผู้จัดการ</option>
                  <option value="director">ผู้อำนวยการ</option>
                </select>
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.position}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                รหัสผ่าน
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.password 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                }`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ยืนยันรหัสผ่าน
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.confirmPassword 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                }`}
                placeholder="••••••••"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                ฉันยอมรับ{' '}
                <Link to="/terms" className="text-green-600 hover:text-green-500 dark:text-green-400">
                  เงื่อนไขการใช้งาน
                </Link>{' '}
                และ{' '}
                <Link to="/privacy" className="text-green-600 hover:text-green-500 dark:text-green-400">
                  นโยบายความเป็นส่วนตัว
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  กำลังสมัครสมาชิก...
                </div>
              ) : (
                'สมัครสมาชิก'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              มีบัญชีอยู่แล้ว?{' '}
              <Link
                to="/login"
                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register 