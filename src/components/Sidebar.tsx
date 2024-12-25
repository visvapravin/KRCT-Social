import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Settings, X, HelpCircle, Users, Info } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onMouseLeave: () => void;
}

export default function Sidebar({ isOpen, onClose, onMouseLeave }: SidebarProps) {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: "-100%", opacity: 0 }
  };

  const overlayVariants = {
    open: { opacity: 0.5 },
    closed: { opacity: 0 }
  };

  const mainLinks = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const secondaryLinks = [
    { to: "/invite", icon: Users, label: "Invite Friends" },
    { to: "/help", icon: HelpCircle, label: "Help Desk" },
    { to: "/info", icon: Info, label: "App Info" },
    { to: "/settings", icon: Settings, label: "Settings" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        onMouseLeave={onMouseLeave}
        className="fixed top-0 left-0 h-full w-64 bg-black border-r border-white/10 z-50 transform transition-transform duration-300 ease-in-out flex flex-col lg:transform-none lg:opacity-100 lg:visible"
      >
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-xl font-bold text-white">KRCT Social</h1>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-8">
            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full mb-4 flex items-center justify-center">
              <span className="text-xl font-bold text-white">{user?.username?.[0]}</span>
            </div>
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <nav className="space-y-6">
            <div className="space-y-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${isActive(link.to) 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
                    ${isActive(link.to) 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="p-6 border-t border-white/10">
          <div className="text-center text-sm text-gray-400">
            <p>KRCT Social v1.0</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
}