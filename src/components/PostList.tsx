import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Share2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShareModal from './ShareModal';
import CommentSection from './CommentSection';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';

export default function PostList() {
  const { 
    posts, 
    likePost, 
    dislikePost, 
    addComment, 
    deleteComment, 
    deletePost,
    updateComment 
  } = usePostStore();
  const user = useAuthStore((state) => state.user);
  const [activeComments, setActiveComments] = useState<string | null>(null);
  const [shareModalPost, setShareModalPost] = useState<string | null>(null);

  const sortedPosts = [...posts].sort((a, b) => 
    new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {sortedPosts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-card hover-glow rounded-2xl p-6 relative group"
        >
          {/* Post header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center">
                <span className="text-sm font-bold">{post.username[0]}</span>
              </div>
              <div>
                <div className="font-medium text-gradient">
                  {post.username}
                </div>
                <div className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {user?.username === post.username && (
                <button
                  onClick={() => deletePost(post.id)}
                  className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white/5 rounded-full transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button 
                onClick={() => setShareModalPost(post.id)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Post content */}
          <p className="text-gray-100 mb-6 leading-relaxed">{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="rounded-lg mb-6 max-h-96 w-full object-cover"
            />
          )}
          
          {/* Post actions */}
          <div className="flex items-center space-x-6 text-gray-400">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => likePost(post.id)}
              className={`flex items-center space-x-2 transition-colors group/btn
                ${post.liked ? 'text-white' : 'hover:text-white'}`}
            >
              <div className={`p-2 rounded-full transition-colors
                ${post.liked ? 'bg-white/10' : 'group-hover/btn:bg-white/5'}`}>
                <ThumbsUp className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.likes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dislikePost(post.id)}
              className={`flex items-center space-x-2 transition-colors group/btn
                ${post.disliked ? 'text-white' : 'hover:text-white'}`}
            >
              <div className={`p-2 rounded-full transition-colors
                ${post.disliked ? 'bg-white/10' : 'group-hover/btn:bg-white/5'}`}>
                <ThumbsDown className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.dislikes}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setActiveComments(activeComments === post.id ? null : post.id)}
              className="flex items-center space-x-2 hover:text-white transition-colors group/btn"
            >
              <div className="p-2 rounded-full group-hover/btn:bg-white/5 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-sm">{post.comments.length}</span>
            </motion.button>
          </div>

          <AnimatePresence>
            {activeComments === post.id && (
              <CommentSection 
                postId={post.id} 
                comments={post.comments}
                onAddComment={addComment}
                onDeleteComment={(commentId) => deleteComment(post.id, commentId)}
                onUpdateComment={(commentId, updates) => updateComment(post.id, commentId, updates)}
              />
            )}
          </AnimatePresence>
        </motion.div>
      ))}

      <AnimatePresence>
        {shareModalPost && (
          <ShareModal
            postId={shareModalPost}
            onClose={() => setShareModalPost(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}