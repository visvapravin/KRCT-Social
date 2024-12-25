import { motion } from 'framer-motion';
import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';
import { Comment as CommentType } from '../types/comment';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { generateUniqueId } from '../utils/generateId';

interface CommentSectionProps {
  postId: string;
  comments: CommentType[];
  onAddComment: (postId: string, comment: CommentType) => void;
  onDeleteComment: (commentId: string) => void;
  onUpdateComment: (commentId: string, updates: Partial<CommentType>) => void;
}

export default function CommentSection({ 
  postId, 
  comments, 
  onAddComment, 
  onDeleteComment,
  onUpdateComment
}: CommentSectionProps) {
  const user = useAuthStore((state) => state.user);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleSubmit = (content: string) => {
    if (user) {
      const newComment: CommentType = {
        id: generateUniqueId('comment'),
        userId: user.id,
        username: user.username,
        content,
        createdAt: new Date().toISOString(),
        likes: []
      };
      onAddComment(postId, newComment);

      addNotification({
        type: 'comment',
        message: `${user.username} commented on your post: "${content.substring(0, 30)}${content.length > 30 ? '...' : ''}"`,
      });
    }
  };

  const handleUpdateLikes = (commentId: string, likes: string[]) => {
    onUpdateComment(commentId, { likes });
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-4 pt-4 border-t border-white/10"
    >
      <CommentForm onSubmit={handleSubmit} />

      <div className="space-y-4">
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            currentUserId={user?.id}
            onDelete={onDeleteComment}
            onUpdateLikes={handleUpdateLikes}
          />
        ))}
      </div>
    </motion.div>
  );
}