import { motion } from 'framer-motion';
import { Trash2, Heart } from 'lucide-react';
import { Comment as CommentType } from '../types/comment';
import { useCommentLikes } from '../hooks/useCommentLikes';

interface CommentProps {
  comment: CommentType;
  currentUserId?: string;
  onDelete: (commentId: string) => void;
  onUpdateLikes: (commentId: string, likes: string[]) => void;
}

export default function Comment({ 
  comment, 
  currentUserId, 
  onDelete,
  onUpdateLikes
}: CommentProps) {
  const { toggleLike, isLikedByUser } = useCommentLikes();
  const isLiked = isLikedByUser(comment.likes);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-start gap-3 group"
    >
      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0">
        <span className="text-sm font-bold">{comment.username[0]}</span>
      </div>
      <div className="flex-1 bg-white/5 rounded-lg p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-sm">{comment.username}</span>
          <span className="text-xs text-gray-400">
            {new Date(comment.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-200">{comment.content}</p>
        <div className="mt-2 flex items-center gap-2">
          <button
            onClick={() => toggleLike(comment, (likes) => onUpdateLikes(comment.id, likes))}
            className={`flex items-center gap-1 text-sm transition-colors ${
              isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={isLiked ? "currentColor" : "none"} />
            <span>{comment.likes.length}</span>
          </button>
        </div>
      </div>
      {currentUserId === comment.userId && (
        <button
          onClick={() => onDelete(comment.id)}
          className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white/5 rounded-lg transition-all"
        >
          <Trash2 className="w-4 h-4 text-gray-400 hover:text-white" />
        </button>
      )}
    </motion.div>
  );
}