import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Lock, Clock, Users } from 'lucide-react';

export default function Landing() {
  const features = [
    {
      icon: Shield,
      title: 'Anonymous Posting',
      description: 'Share your thoughts freely with complete anonymity'
    },
    {
      icon: Lock,
      title: 'KRCT Exclusive',
      description: 'A private space for KRCT community members'
    },
    {
      icon: Clock,
      title: 'Ephemeral Content',
      description: 'Posts automatically disappear after 24 hours'
    },
    {
      icon: Users,
      title: 'Community Polls',
      description: 'Create and participate in anonymous polls'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background grid with reduced opacity */}
      <div className="absolute inset-0 cyber-grid opacity-10" />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative z-10"
      >
        <main className="container mx-auto px-4 min-h-screen flex flex-col items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-12"
            >
              <div className="w-24 h-24 mx-auto mb-8 relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-12 h-12" />
                </div>
              </div>
              <h2 className="text-5xl font-bold mb-6">
                Your Anonymous Voice in
                <span className="block text-gradient mt-2">KRCT Community</span>
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Share thoughts, create polls, and connect with your peers - all while maintaining your privacy.
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/login"
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-300"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-white text-black hover:bg-gray-200 rounded-xl transition-all duration-300"
                >
                  Join Now
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="glass-card p-6 rounded-xl hover-glow"
                >
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>
      </motion.div>
    </div>
  );
}