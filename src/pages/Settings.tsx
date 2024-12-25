import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Trash2, Shield, LogOut, Mail } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [password, setPassword] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      logout();
      navigate('/login');
    } catch (error) {
      alert('Failed to delete account. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <SettingsIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">Account Settings</h2>
        </div>

        <div className="space-y-8">
          {/* Account Information */}
          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Username</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={user?.username}
                    readOnly
                    className="bg-black/20 rounded-lg px-4 py-2 w-full"
                  />
                  <div className="bg-white/10 px-3 py-2 rounded-lg">
                    <Shield className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={user?.email}
                    readOnly
                    className="bg-black/20 rounded-lg px-4 py-2 w-full"
                  />
                  <div className="bg-white/10 px-3 py-2 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/5 p-6 rounded-xl border border-red-500/10">
            <h3 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h3>
            {!showDeleteConfirm ? (
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400"
              >
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <p className="text-sm text-red-400">
                  This action cannot be undone. Please enter your password to confirm.
                </p>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-black/20 rounded-lg px-4 py-2 border border-red-500/20 focus:border-red-500/40"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={!password || isDeleting}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-400 disabled:opacity-50"
                  >
                    {isDeleting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-red-400/20 border-t-red-400 rounded-full"
                      />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                    Confirm Delete
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
}