import { motion } from 'framer-motion';
import { Info, Shield, Clock, Users, Lock } from 'lucide-react';

export default function AppInfo() {
  const features = [
    {
      icon: Shield,
      title: 'Anonymous Posting',
      description: 'Share thoughts freely with complete anonymity through our unique username system.'
    },
    {
      icon: Clock,
      title: 'Ephemeral Content',
      description: 'All posts and interactions automatically disappear after 24 hours.'
    },
    {
      icon: Users,
      title: 'KRCT Exclusive',
      description: 'A private space only accessible to verified KRCT community members.'
    },
    {
      icon: Lock,
      title: 'Privacy First',
      description: 'Advanced encryption and security measures to protect user identities.'
    }
  ];

  const stats = [
    { label: 'Active Users', value: '500+' },
    { label: 'Daily Posts', value: '1000+' },
    { label: 'Avg. Response Time', value: '< 2min' },
    { label: 'User Rating', value: '4.8/5' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Info className="w-6 h-6" />
          <h2 className="text-xl font-bold">About KRCT Social</h2>
        </div>

        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">KRCT Social v1.0</h1>
            <p className="text-gray-400">
              A secure, anonymous platform exclusively for the KRCT community
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 p-4 rounded-xl text-center"
              >
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 bg-white/5 rounded-xl"
              >
                <div className="p-2 bg-white/10 rounded-lg">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>© 2024 KRCT Social. All rights reserved.</p>
            <p className="mt-2">
              Made with ♥ for the KRCT community
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}