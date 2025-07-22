export interface CommentUser {
  id: string;
  username: string;
  displayName?: string;
  avatar: string;
  // userType removed - social media apps don't typically show user roles
  verified?: boolean;
}

export interface Comment {
  id: string;
  user: CommentUser;
  content: string;
  timeAgo: string;
  timestamp: Date;
  likes: number;
  isLiked?: boolean;
  replies?: Comment[];
  replyCount?: number;
  isReply?: boolean;
  parentId?: string;
  edited?: boolean;
  editedAt?: Date;
}

export interface CommentListProps {
  comments: Comment[];
  onLike?: (commentId: string) => void;
  onReply?: (commentId: string, comment: Comment) => void;
  onDelete?: (commentId: string) => void;
  onEdit?: (commentId: string, newContent: string) => void;
  onUserPress?: (userId: string) => void;
  showReplies?: boolean;
  maxRepliesShown?: number;
}

export interface CommentInputProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  replyTo?: Comment;
  onCancel?: () => void;
} 