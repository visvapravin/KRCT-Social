import { motion } from 'framer-motion';
import { Activity as ActivityIcon, MessageCircle, ThumbsUp, PieChart, Clock } from 'lucide-react';
import { usePostStore } from '../stores/postStore';
import { useAuthStore } from '../stores/authStore';

export default function Activity() {
  const posts = usePostStore((state) => state.posts);
  const user = useAuthStore((state) => state.user);

  const userPosts = posts.filter(post => post.username === user?.username);
  const userComments = posts.flatMap(post => 
    post.comments.filter(comment => comment.username === user?.username)
  );

  const activities = [
    ...userPosts.map(post => ({
      type: 'post',
      content: post.content,
      timestamp: post.createdAt,
      stats: {
        likes: post.likes,
        comments: post.comments.length
      }
    })),
    ...userComments.map(comment => ({
      type: 'comment',
      content: comment.content,
      timestamp: comment.createdAt,
      stats: {
        hearts: comment.hearts
      }
    }))
  ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      <div className="glass-card p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <ActivityIcon className="w-6 h-6" />
          <h2 className="text-xl font-bold">Your Activity</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: MessageCircle, label: 'Posts', value: userPosts.length },
            { icon: ThumbsUp, label: 'Interactions', value: userPosts.reduce((acc, post) => acc + post.likes + post.dislikes, 0) },
            { icon: Clock, label: 'Hours Active', value: Math.floor(Math.random() * 24) }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 p-4 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="space-y-4">
          {activities.length > 0 ? (
            activities.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  {activity.type === 'post' ? (
                    <PieChart className="w-4 h-4 text-gray-400" />
                  ) : (
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className="text-sm text-gray-400">
                    {activity.type === 'post' ? 'Created a post' : 'Commented on a post'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{activity.content}</p>
                <div className="mt-2 flex items-center gap-4">
                  {activity.type === 'post' && (
                    <>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" />
                        {activity.stats.likes}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {activity.stats.comments}
                      </span>
                    </>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-400">
              No activity yet. Start posting and interacting!
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}