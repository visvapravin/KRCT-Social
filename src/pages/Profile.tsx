import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { Settings, Shield, Clock, Lock, Download, Activity } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showActivity, setShowActivity] = useState(false);

  const statsVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 }
    })
  };

  const handleDownloadData = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const userData = {
        profile: {
          username: user?.username,
          email: user?.email,
          joinDate: new Date().toISOString()
        },
        activity: {
          posts: [],
          comments: [],
          likes: []
        }
      };

      const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'krct-social-data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="relative">
      {/* Profile Banner */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-48 w-full bg-black relative overflow-hidden rounded-b-2xl border-b border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-20" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto space-y-6 -mt-24 relative z-10 px-4"
      >
        <motion.div 
          className="bg-black rounded-2xl p-8 border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="text-center relative">
            <motion.div 
              className="w-24 h-24 bg-white/5 rounded-full mx-auto mb-4 flex items-center justify-center relative overflow-hidden border border-white/10"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl font-bold relative z-10">{user?.username?.[0]}</span>
            </motion.div>
            <h2 className="text-2xl font-bold mb-2">{user?.username}</h2>
            <p className="text-gray-400 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Anonymous User
            </p>
          </div>

          <div className="mt-8 border-t border-white/10 pt-8">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Your Stats
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Posts', value: '0' },
                { label: 'Likes', value: '0' },
                { label: 'Polls', value: '0' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statsVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 p-4 rounded-xl border border-white/10"
                >
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-black rounded-2xl p-6 border border-white/10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Privacy Status
          </h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400">Identity Hidden</span>
            </div>
            <button className="px-4 py-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors border border-white/10">
              Manage Privacy
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            onClick={() => setShowActivity(true)}
            className="p-4 bg-black rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
          >
            <Activity className="w-5 h-5" />
            <div className="text-left">
              <div className="text-sm font-medium">View Activity</div>
              <div className="text-xs text-gray-400">See your interactions</div>
            </div>
          </button>

          <button 
            onClick={handleDownloadData}
            disabled={isDownloading}
            className="p-4 bg-black rounded-xl border border-white/10 hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
          >
            <Download className="w-5 h-5" />
            <div className="text-left">
              <div className="text-sm font-medium">
                {isDownloading ? 'Preparing...' : 'Download Data'}
              </div>
              <div className="text-xs text-gray-400">Get your information</div>
            </div>
          </button>
        </motion.div>

        {showActivity && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-2xl p-6 border border-white/10"
          >
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="text-gray-400 text-center py-8">
              No activity to show yet
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}