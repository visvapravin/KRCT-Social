import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Sparkles, MessageSquareMore } from 'lucide-react';
import PostList from '../components/PostList';
import CreatePostModal from '../components/CreatePostModal';
import { useState, useRef, useEffect } from 'react';
import { usePostStore } from '../stores/postStore';

export default function Home() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const posts = usePostStore((state) => state.posts);

  // Auto-scroll when new post is added
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [posts.length]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto flex flex-col items-center"
    >
      {/* Anonymous Thoughts Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full mb-6 p-6 glass-card rounded-2xl relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Anonymous thoughts fade in 24h</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white/20"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: 24 * 60 * 60, // 24 hours
                ease: "linear",
                repeat: Infinity
              }}
            />
          </div>
        </div>
      </motion.div>

      {/* Posts Section */}
      <div className="w-full space-y-6">
        <PostList />
        {/* Invisible div for scrolling reference */}
        <div ref={bottomRef} />
      </div>

      {/* Let the gossip begin header */}
      <div className="sticky bottom-6 z-30 w-full flex justify-between items-center mt-6 bg-black/50 backdrop-blur-sm p-4 rounded-xl border border-white/5">
        <h1 className="text-2xl font-bold flex items-center gap-3">
          <span>Let the gossip begin</span>
          <motion.div
            className="relative"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <MessageSquareMore className="w-6 h-6 filter blur-[0.2px]" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0"
              animate={{
                x: ["-200%", "200%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </motion.div>
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCreateModalOpen(true)}
          className="p-2 hover:bg-white/5 rounded-full transition-colors"
        >
          <PlusCircle className="w-6 h-6" />
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreatePostModal onClose={() => setIsCreateModalOpen(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}