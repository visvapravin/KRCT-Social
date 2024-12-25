import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const handleEmojiSelect = (emoji: any) => {
    onSelect(emoji.native);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-black border border-white/10 rounded-xl overflow-hidden shadow-2xl w-[280px]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between p-2 border-b border-white/10">
        <h3 className="text-sm font-medium">Emoji Picker</h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/5 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <Picker
        data={data}
        onEmojiSelect={handleEmojiSelect}
        theme="dark"
        skinTonePosition="none"
        previewPosition="none"
        searchPosition="sticky"
        maxFrequentRows={0}
        navPosition="bottom"
        perLine={7}
        emojiSize={24}
        emojiButtonSize={32}
        categories={[
          'people',
          'nature',
          'foods',
          'activity',
          'objects',
          'symbols',
          'flags'
        ]}
        locale="en"
        autoFocus={false}
      />
    </motion.div>
  );
}