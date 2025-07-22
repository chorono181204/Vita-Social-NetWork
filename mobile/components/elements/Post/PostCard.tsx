import React from 'react';
import Post, { PostData } from './Post';
import RecipeCard from './RecipeCard';
import { RecipePostData } from '@/types';

export type AllPostData = PostData | RecipePostData;

interface PostCardProps {
  data: AllPostData;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onSave?: () => void;
  onUserPress?: () => void;
  onViewRecipe?: () => void;
  onMorePress?: () => void;
}

export default function PostCard({ 
  data, 
  onLike, 
  onComment, 
  onShare, 
  onSave,
  onUserPress,
  onViewRecipe,
  onMorePress
}: PostCardProps) {
  if ('type' in data && data.type === 'recipe') {
    return (
      <RecipeCard
        data={data as RecipePostData}
        onLike={onLike}
        onComment={onComment}
        onShare={onShare}
        onSave={onSave}
        onUserPress={onUserPress}
        onViewRecipe={onViewRecipe}
        onMorePress={onMorePress}
      />
    );
  }

  // Default to regular status post
  return (
    <Post
      data={data as PostData}
      onLike={onLike}
      onComment={onComment}
      onSave={onSave}
      onShare={onShare}
      onUserPress={onUserPress}
      onMorePress={onMorePress}
    />
  );
} 