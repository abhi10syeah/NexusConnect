export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  bio?: string;
  avatar?: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  likes: number;
  comments: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  createdAt: Date;
}

export type NotificationType = 'like' | 'comment' | 'follow';

export interface Notification {
  id: string;
  recipientId: string;
  type: NotificationType;
  actor: User;
  post?: { id: string; content: string };
  read: boolean;
  createdAt: Date;
}
