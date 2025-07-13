import React from 'react'

interface NavbarProps {
  onMenuClick: () => void
  onThemeToggle: () => void
  theme: string
}

const Navbar: React.FC<NavbarProps> = ({ onMenuClick, onThemeToggle, theme }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3 flex items-center justify-between">
        <button onClick={onMenuClick} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          ☰
        </button>
        <div className="text-xl font-bold text-gray-900 dark:text-white">EMS Pro</div>
        <button onClick={onThemeToggle} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar 