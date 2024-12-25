import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Image, PieChart, Smile, Hash, AtSign, Send } from 'lucide-react';
import EmojiPicker from './EmojiPicker';
import HashtagPicker from './HashtagPicker';
import UserTag from './UserTag';
import PollCreator from './PollCreator';
import { useAuthStore } from '../stores/authStore';
import { usePostStore } from '../stores/postStore';
import { useTagging } from '../hooks/useTagging';

interface CreatePostModalProps {
  onClose: () => void;
}

export default function CreatePostModal({ onClose }: CreatePostModalProps) {
  const [content, setContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showHashtagPicker, setShowHashtagPicker] = useState(false);
  const [showPollCreator, setShowPollCreator] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const user = useAuthStore((state) => state.user);
  const addPost = usePostStore((state) => state.addPost);
  const { showTagPicker, setShowTagPicker, handleTag } = useTagging();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    const newContent = content.slice(0, cursorPosition) + emoji + content.slice(cursorPosition);
    setContent(newContent);
    setShowEmojiPicker(false);
  };

  const handleHashtagSelect = (hashtag: string) => {
    const cursorPosition = textareaRef.current?.selectionStart || 0;
    const newContent = content.slice(0, cursorPosition) + hashtag + ' ' + content.slice(cursorPosition);
    setContent(newContent);
    setShowHashtagPicker(false);
  };

  const handleUserTag = (username: string) => {
    const newContent = handleTag(content, username);
    setContent(newContent);
    setShowTagPicker(false);
  };

  const handleSubmit = async () => {
    if (!content.trim() && !selectedImage && !showPollCreator) return;
    
    setIsSubmitting(true);
    try {
      const newPost = {
        id: Date.now().toString(),
        username: user?.username || 'Anonymous',
        content: content.trim(),
        image: selectedImage,
        likes: 0,
        dislikes: 0,
        comments: [],
        liked: false,
        disliked: false,
        createdAt: new Date().toISOString(),
      };

      await addPost(newPost);
      onClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-40"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass-card rounded-xl w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <span className="text-sm font-bold">{user?.username?.[0]}</span>
            </div>
            <span className="font-medium">{user?.username}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full h-32 bg-transparent resize-none focus:outline-none text-lg placeholder-gray-500"
            autoFocus
          />

          {selectedImage && (
            <div className="relative mt-4 group">
              <img
                src={selectedImage}
                alt="Selected"
                className="rounded-lg max-h-64 w-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {showPollCreator && (
            <PollCreator
              onClose={() => setShowPollCreator(false)}
              onSubmit={(pollData) => {
                setContent(prev => `${prev}\n\nPoll: ${pollData.question}\nOptions: ${pollData.options.join(', ')}\nDuration: ${pollData.duration}h`);
                setShowPollCreator(false);
              }}
            />
          )}
        </div>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={handleImageClick}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors relative group"
              >
                <Image className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Add image
                </span>
              </button>
              <button
                onClick={() => setShowPollCreator(true)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors relative group"
              >
                <PieChart className="w-5 h-5" />
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  Create poll
                </span>
              </button>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowEmojiPicker(!showEmojiPicker);
                    setShowHashtagPicker(false);
                    setShowTagPicker(false);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors relative group"
                >
                  <Smile className="w-5 h-5" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Add emoji
                  </span>
                </button>
                <AnimatePresence>
                  {showEmojiPicker && (
                    <div className="absolute bottom-12 right-0 z-50">
                      <EmojiPicker 
                        onSelect={handleEmojiSelect} 
                        onClose={() => setShowEmojiPicker(false)}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowHashtagPicker(!showHashtagPicker);
                    setShowEmojiPicker(false);
                    setShowTagPicker(false);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors relative group"
                >
                  <Hash className="w-5 h-5" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Add hashtag
                  </span>
                </button>
                <AnimatePresence>
                  {showHashtagPicker && (
                    <div className="absolute bottom-12 right-0 z-50">
                      <HashtagPicker 
                        onSelect={handleHashtagSelect}
                        onClose={() => setShowHashtagPicker(false)}
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <div className="relative">
                <button
                  onClick={() => {
                    setShowTagPicker(!showTagPicker);
                    setShowEmojiPicker(false);
                    setShowHashtagPicker(false);
                  }}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors relative group"
                >
                  <AtSign className="w-5 h-5" />
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Tag user
                  </span>
                </button>
                <AnimatePresence>
                  {showTagPicker && (
                    <div className="absolute bottom-12 right-0 z-50">
                      <UserTag onSelect={handleUserTag} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={(!content.trim() && !selectedImage) || isSubmitting}
              className="px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full"
                />
              ) : (
                <>
                  <span>Post</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}