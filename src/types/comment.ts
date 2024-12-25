export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  likes: string[]; // Array of user IDs who liked the comment
}