import { motion } from 'framer-motion';
import { X, Facebook, Twitter, MessageCircleMore, Link as LinkIcon, Instagram } from 'lucide-react';

interface ShareModalProps {
  postId: string;
  onClose: () => void;
}

export default function ShareModal({ postId, onClose }: ShareModalProps) {
  const shareUrl = `https://krct.social/post/${postId}`; // Replace with actual URL

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: `https://www.instagram.com/`, // Opens Instagram - Story sharing needs to be handled in mobile
    },
    {
      name: 'WhatsApp',
      icon: MessageCircleMore,
      url: `https://wa.me/?text=${encodeURIComponent(shareUrl)}`,
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    // TODO: Show success toast
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card rounded-xl w-full max-w-sm relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">Share Post</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="grid grid-cols-4 gap-4">
            {shareOptions.map((option) => (
              <a
                key={option.name}
                href={option.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-3 hover:bg-white/5 rounded-xl transition-colors"
              >
                <option.icon className="w-6 h-6" />
                <span className="text-sm">{option.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}