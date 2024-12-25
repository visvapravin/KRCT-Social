import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle, FileText, AlertCircle } from 'lucide-react';

export default function HelpDesk() {
  const faqs = [
    {
      question: 'How does anonymity work?',
      answer: 'Your identity is protected by our unique username system (3 letters + 6 numbers). Only KRCT email holders can register and participate.'
    },
    {
      question: 'How long do posts stay visible?',
      answer: 'All posts and interactions automatically disappear after 24 hours to maintain privacy and freshness.'
    },
    {
      question: 'Can I change my username?',
      answer: 'Usernames are automatically assigned and change when someone reveals your identity through the payment system.'
    },
    {
      question: 'Is my KRCT email visible to others?',
      answer: 'No, your email remains private. Only your assigned anonymous username is visible to other users.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <HelpCircle className="w-6 h-6" />
          <h2 className="text-xl font-bold">Help & Support</h2>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-black/20 rounded-lg"
                >
                  <h4 className="font-medium mb-2">{faq.question}</h4>
                  <p className="text-sm text-gray-400">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 p-6 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-semibold">Contact Support</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Need help? Our support team is here for you.
              </p>
              <a
                href="mailto:thehorizonstudioscompany@gmail.com"
                className="inline-block px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                Email Support
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 p-6 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5" />
                <h3 className="font-semibold">Documentation</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Learn more about features and guidelines.
              </p>
              <button className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                View Docs
              </button>
            </motion.div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5" />
              <h3 className="font-semibold">Report an Issue</h3>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Found a bug or have a security concern? Let us know immediately.
            </p>
            <a
              href="mailto:thehorizonstudioscompany@gmail.com?subject=KRCT%20Social%20-%20Issue%20Report"
              className="inline-block px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Report Issue
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}