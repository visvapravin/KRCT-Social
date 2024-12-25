import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface PollCreatorProps {
  onClose: () => void;
  onSubmit?: (pollData: PollData) => void;
}

interface PollData {
  question: string;
  options: string[];
  duration: number;
}

export default function PollCreator({ onClose, onSubmit }: PollCreatorProps) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [duration, setDuration] = useState('24');

  const addOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = () => {
    if (question.trim() && options.every(opt => opt.trim())) {
      onSubmit?.({
        question,
        options: options.filter(opt => opt.trim()),
        duration: parseInt(duration)
      });
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 border-t border-white/10"
    >
      <div className="space-y-4">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
          className="w-full bg-white/5 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-1 focus:ring-white/20 focus:outline-none"
        />

        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                className="flex-1 bg-white/5 rounded-lg p-2 text-white placeholder-gray-400 focus:ring-1 focus:ring-white/20 focus:outline-none"
              />
              {options.length > 2 && (
                <button
                  onClick={() => removeOption(index)}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {options.length < 4 && (
          <button
            onClick={addOption}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Option
          </button>
        )}

        <div className="flex items-center gap-4">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="bg-gray-800 rounded-lg p-2 text-white border border-white/10 focus:ring-1 focus:ring-white/20 focus:outline-none cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <option value="1">1 hour</option>
            <option value="6">6 hours</option>
            <option value="12">12 hours</option>
            <option value="24">24 hours</option>
          </select>

          <div className="flex gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!question.trim() || !options.every(opt => opt.trim())}
              className="px-4 py-2 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Create Poll
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}