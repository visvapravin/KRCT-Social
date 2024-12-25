import { useAuthStore } from '../stores/authStore';
import { useNotificationStore } from '../stores/notificationStore';

export function useCommentLikes() {
  const user = useAuthStore((state) => state.user);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const toggleLike = (comment: any, onUpdate: (likes: string[]) => void) => {
    if (!user) return;

    const isLiked = comment.likes.includes(user.id);
    const newLikes = isLiked
      ? comment.likes.filter((id: string) => id !== user.id)
      : [...comment.likes, user.id];

    // Send notification only when liking (not unliking)
    if (!isLiked && comment.userId !== user.id) {
      addNotification({
        type: 'like',
        message: `${user.username} liked your comment: "${comment.content.substring(0, 30)}${
          comment.content.length > 30 ? '...' : ''
        }"`,
      });
    }

    onUpdate(newLikes);
  };

  const isLikedByUser = (likes: string[]) => {
    return user ? likes.includes(user.id) : false;
  };

  return { toggleLike, isLikedByUser };
}