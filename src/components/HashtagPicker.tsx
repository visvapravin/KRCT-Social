import { motion } from 'framer-motion';
import { TrendingUp, Search, Plus, Hash, X } from 'lucide-react';
import { useHashtagStore } from '../stores/hashtagStore';
import { useState } from 'react';

interface HashtagPickerProps {
  onSelect: (hashtag: string) => void;
  onClose: () => void;
}

export default function HashtagPicker({ onSelect, onClose }: HashtagPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [customHashtag, setCustomHashtag] = useState('');
  const { trendingHashtags, customHashtags, addCustomHashtag } = useHashtagStore();

  const staticHashtags = [
    '#KRCT', '#Campus', '#Study', '#Events', 
    '#College', '#Student', '#University', '#Academic'
  ];

  const allHashtags = [...trendingHashtags.map(t => t.tag), ...staticHashtags, ...customHashtags];
  const filteredHashtags = searchTerm
    ? allHashtags.filter(tag => 
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleCustomHashtag = () => {
    if (customHashtag) {
      const formattedHashtag = customHashtag.startsWith('#') 
        ? customHashtag 
        : `#${customHashtag}`;
      addCustomHashtag(formattedHashtag);
      onSelect(formattedHashtag);
      setCustomHashtag('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-black border border-white/10 rounded-xl shadow-xl w-80">
        <div className="flex justify-between items-center p-3 border-b border-white/10">
          <span className="text-sm font-medium">Hashtags</span>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/5 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search hashtags..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-lg text-sm"
              autoFocus
            />
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={customHashtag}
                onChange={(e) => setCustomHashtag(e.target.value.replace(/\s+/g, ''))}
                placeholder="Create custom hashtag"
                className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-lg text-sm"
              />
            </div>
            <button
              onClick={handleCustomHashtag}
              disabled={!customHashtag}
              className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="max-h-64 overflow-y-auto custom-scrollbar">
            {searchTerm ? (
              <div className="space-y-1">
                {filteredHashtags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => onSelect(tag)}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm"
                  >
                    {tag}
                  </button>
                ))}
                {filteredHashtags.length === 0 && (
                  <div className="text-center py-2 text-sm text-gray-400">
                    No hashtags found
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending Now</span>
                  </div>
                  <div className="space-y-1">
                    {trendingHashtags.map((tag) => (
                      <button
                        key={tag.tag}
                        onClick={() => onSelect(tag.tag)}
                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm group"
                      >
                        <span>{tag.tag}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">{tag.count}</span>
                          {tag.isRising && (
                            <TrendingUp className="w-3 h-3 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {customHashtags.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-400 mb-2">Your Hashtags</div>
                    <div className="space-y-1">
                      {customHashtags.map((tag) => (
                        <button
                          key={tag}
                          onClick={() => onSelect(tag)}
                          className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <div className="text-sm text-gray-400 mb-2">Common Hashtags</div>
                  {staticHashtags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => onSelect(tag)}
                      className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm text-gray-400 hover:text-white"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}