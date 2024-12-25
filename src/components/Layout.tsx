import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { useState } from 'react';
import { Menu, Bell, LogOut } from 'lucide-react';
import NotificationCenter from './NotificationCenter';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const { logout } = useAuthStore();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  const handleMouseEnter = () => {
    setIsSidebarOpen(true);
  };

  const handleMouseLeave = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-zinc-900/95 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            onMouseEnter={handleMouseEnter}
            className="p-2 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-bold text-gradient absolute left-1/2 -translate-x-1/2">
            KRCT Social
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 hover:bg-white/5 rounded-full transition-colors relative"
            >
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black w-5 h-5 rounded-full text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={logout}
              className="p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)}
        onMouseLeave={handleMouseLeave}
      />
      
      <NotificationCenter 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="pt-24 min-h-screen"
      >
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}