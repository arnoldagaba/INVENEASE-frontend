import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuthStore } from '../../store/authStore';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const user = useAuthStore((state) => state.user);
  
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center px-4">
      <div className="flex-1" />
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        
        <button
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        
        <div className="flex items-center space-x-3">
          <div className="text-sm">
            <p className="font-medium text-gray-700 dark:text-gray-200">{user?.name}</p>
            <p className="text-gray-500 dark:text-gray-400 capitalize">{user?.role}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <span className="text-primary-700 dark:text-primary-300 font-medium">
              {user?.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};