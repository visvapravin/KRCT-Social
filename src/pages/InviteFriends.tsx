import { motion } from 'framer-motion';
import { Users, Mail, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function InviteFriends() {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  const inviteLink = 'https://krct.social/join?ref=ABC123456';

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.endsWith('@krct.ac.in')) {
      setInviteSent(true);
      setEmail('');
      setTimeout(() => setInviteSent(false), 3000);
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
          <Users className="w-6 h-6" />
          <h2 className="text-xl font-bold">Invite Friends</h2>
        </div>

        <div className="space-y-8">
          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Share Invite Link</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inviteLink}
                readOnly
                className="flex-1 bg-black/20 rounded-lg px-4 py-2 text-sm"
              />
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="bg-white/5 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Send Email Invite</h3>
            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                  Friend's KRCT Email
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="friend@krct.ac.in"
                    className="flex-1 bg-black/20 rounded-lg px-4 py-2"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
              {inviteSent && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-green-400"
                >
                  Invitation sent successfully!
                </motion.p>
              )}
            </form>
          </div>

          <div className="text-center text-sm text-gray-400">
            <p>Only KRCT email addresses (@krct.ac.in) can join the platform.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}