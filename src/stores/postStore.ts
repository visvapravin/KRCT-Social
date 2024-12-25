import { create } from 'zustand';
import { Comment } from '../types/comment';

interface Post {
  id: string;
  username: string;
  content: string;
  image?: string | null;
  likes: number;
  dislikes: number;
  comments: Comment[];
  liked: boolean;
  disliked: boolean;
  createdAt: string;
}

interface PostState {
  posts: Post[];
  addPost: (post: Post) => void;
  likePost: (postId: string) => void;
  dislikePost: (postId: string) => void;
  addComment: (postId: string, comment: Comment) => void;
  deleteComment: (postId: string, commentId: string) => void;
  deletePost: (postId: string) => void;
  updateComment: (postId: string, commentId: string, updates: Partial<Comment>) => void;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              disliked: false,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
              dislikes: post.disliked ? post.dislikes - 1 : post.dislikes,
            }
          : post
      ),
    })),
  dislikePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              disliked: !post.disliked,
              liked: false,
              dislikes: post.disliked ? post.dislikes - 1 : post.dislikes + 1,
              likes: post.liked ? post.likes - 1 : post.likes,
            }
          : post
      ),
    })),
  addComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, comment] }
          : post
      ),
    })),
  deleteComment: (postId, commentId) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c.id !== commentId),
            }
          : post
      ),
    })),
  deletePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),
  updateComment: (postId, commentId, updates) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, ...updates }
                  : comment
              ),
            }
          : post
      ),
    })),
}));