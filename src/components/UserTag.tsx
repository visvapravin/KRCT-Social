import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface UserTagProps {
  onSelect: (username: string) => void;
}

export default function UserTag({ onSelect }: UserTagProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState<Array<{ username: string; id: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (searchTerm.length < 1) {
      setUsers([]);
      return;
    }

    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const q = query(
          collection(db, 'users'),
          where('username', '>=', searchTerm.toUpperCase()),
          where('username', '<=', searchTerm.toUpperCase() + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        const userResults = querySnapshot.docs.map(doc => ({
          id: doc.id,
          username: doc.data().username
        }));
        setUsers(userResults);
      } catch (error) {
        console.error('Error searching users:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, [searchTerm]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-full left-0 mb-2 z-[9999]"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-black border border-white/10 rounded-xl shadow-xl w-64">
        <div className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 rounded-lg text-sm"
              autoFocus
            />
          </div>

          <div className="max-h-48 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="text-center py-2 text-sm text-gray-400">
                Searching...
              </div>
            ) : users.length > 0 ? (
              <div className="space-y-1">
                {users.map((user) => (
                  <button
                    key={user.id}
                    onClick={() => onSelect(user.username)}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded-lg transition-colors text-sm"
                  >
                    @{user.username}
                  </button>
                ))}
              </div>
            ) : searchTerm ? (
              <div className="text-center py-2 text-sm text-gray-400">
                No users found
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </motion.div>
  );
}