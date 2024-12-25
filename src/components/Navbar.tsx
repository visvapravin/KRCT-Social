import { Link } from 'react-router-dom';
import { Home, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

export default function Navbar() {
  const { logout } = useAuthStore();

  return (
    <nav className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">KRCT Social</Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="p-2 hover:bg-gray-900 rounded-full transition">
              <Home className="w-6 h-6" />
            </Link>
            <Link to="/profile" className="p-2 hover:bg-gray-900 rounded-full transition">
              <User className="w-6 h-6" />
            </Link>
            <button
              onClick={logout}
              className="p-2 hover:bg-gray-900 rounded-full transition"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}