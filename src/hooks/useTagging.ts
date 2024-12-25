import { useState, useCallback } from 'react';
import { useNotificationStore } from '../stores/notificationStore';

export function useTagging() {
  const [showTagPicker, setShowTagPicker] = useState(false);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const handleTag = useCallback((content: string, username: string) => {
    const newContent = `${content} @${username} `;
    
    // Send notification to tagged user
    addNotification({
      type: 'mention',
      message: `You were mentioned in a post`,
    });

    return newContent;
  }, [addNotification]);

  return {
    showTagPicker,
    setShowTagPicker,
    handleTag
  };
}