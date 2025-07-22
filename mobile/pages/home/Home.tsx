import React, { useState } from 'react';
import { FlatList, StyleSheet, RefreshControl, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/theme';
import MainLayout from '@/components/layouts/Main/MainLayout';
import { PostCard, AllPostData, PostMoreModal, SharePostModal } from '@/components/elements/Post';
import { CommentsModal } from '@/components/elements/Comment';
import { RecipePostData, Recipe, Comment } from '@/types';
import { RecipeDetail } from '@/pages/recipe';
import { FeedSelectorModal, FeedType } from '@/components/elements/FeedSelector';
import { useUserNavigation } from '@/hooks/useUserNavigation';

// Mock post comments
const MOCK_POST_COMMENTS: { [postId: string]: Comment[] } = {
  '1': [
    {
      id: 'p1-1',
      user: {
        id: 'user1',
        username: 'fitness_lover',
        displayName: 'Mark Johnson',
        avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
      },
      content: 'This looks absolutely delicious! What\'s your secret ingredient?',
      timeAgo: '1 hour ago',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      likes: 15,
      isLiked: false,
      replies: [],
      replyCount: 0,
    },
    {
      id: 'p1-2',
      user: {
        id: 'user2',
        username: 'healthy_eats',
        displayName: 'Emma Wilson',
        avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
        verified: true,
      },
      content: 'Love this! Perfect for my meal prep this week 💪',
      timeAgo: '2 hours ago',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      likes: 8,
      isLiked: true,
      replies: [
        {
          id: 'p1-2-1',
          user: {
            id: 'user3',
            username: 'prep_master',
            displayName: 'Alex Chen',
            avatar: 'https://randomuser.me/api/portraits/men/23.jpg',
          },
          content: 'Same here! Meal prep gang! 🙌',
          timeAgo: '1 hour ago',
          timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
          likes: 3,
          isLiked: false,
          parentId: 'p1-2',
          isReply: true,
        }
      ],
      replyCount: 1,
    }
  ],
  '2': [
    {
      id: 'p2-1',
      user: {
        id: 'user4',
        username: 'nutrition_nerd',
        displayName: 'Dr. Sarah Kim',
        avatar: 'https://randomuser.me/api/portraits/women/24.jpg',
        verified: true,
      },
      content: 'Great combination of nutrients! I love how you balanced the macros here.',
      timeAgo: '3 hours ago',
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      likes: 22,
      isLiked: false,
      replies: [],
      replyCount: 0,
    }
  ],
  '3': [
    {
      id: 'p3-1',
      user: {
        id: 'user5',
        username: 'workout_warrior',
        displayName: 'Jake Thompson',
        avatar: 'https://randomuser.me/api/portraits/men/25.jpg',
      },
      content: 'This is going straight into my post-workout meal rotation! 🏋️‍♂️',
      timeAgo: '4 hours ago',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      likes: 18,
      isLiked: true,
      replies: [],
      replyCount: 0,
    }
  ]
};

// Mock data cho posts (bao gồm status và recipe)
const mockPosts: AllPostData[] = [
  {
    id: '1',
    user: {
      username: 'vt18122004',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    content: 'What\'s new today?',
    timeAgo: '2 hours',
    stats: {
      likes: 86,
      comments: 3,
      shares: 12,
      saves: 15,
    },
    isLiked: false,
    isSaved: false,
  },
  {
    id: '2',
    type: 'recipe',
    user: {
      username: 'chef_anna',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    caption: 'Super healthy quinoa salad for lunch! Packed with protein and fiber 🥗✨',
    timeAgo: '4 hours',
    recipe: {
      id: 'recipe_1',
      title: 'Healthy Quinoa Vegetable Salad',
      description: 'A nutritious salad with quinoa, fresh vegetables and honey lemon dressing',
      category: 'Salad',
      difficulty: 'Easy',
      cookingTime: 20,
      servings: 2,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500',
      ingredients: [
        { id: '1', name: 'Quinoa', amount: 100, unit: 'g' },
        { id: '2', name: 'Cucumber', amount: 1, unit: 'piece' },
        { id: '3', name: 'Cherry tomatoes', amount: 200, unit: 'g' },
        { id: '4', name: 'Avocado', amount: 1, unit: 'piece' },
        { id: '5', name: 'Honey', amount: 2, unit: 'tbsp' },
        { id: '6', name: 'Lemon juice', amount: 1, unit: 'piece' },
        { id: '7', name: 'Olive oil', amount: 3, unit: 'tbsp' },
        { id: '8', name: 'Red bell pepper', amount: 1, unit: 'piece' },
        { id: '9', name: 'Fresh herbs (mint, parsley)', amount: 50, unit: 'g' },
      ],
      instructions: [
        'Rinse quinoa thoroughly under cold water until water runs clear. Cook in 2 cups of boiling water for 15 minutes.',
        'Drain quinoa and let it cool completely. Fluff with a fork.',
        'Dice cucumber, avocado, and red bell pepper into small cubes.',
        'Cut cherry tomatoes in half and roughly chop fresh herbs.',
        'In a small bowl, whisk together lemon juice, honey, olive oil, salt and pepper to make dressing.',
        'In a large bowl, combine cooled quinoa with all chopped vegetables.',
        'Pour dressing over salad and toss gently to combine.',
        'Let salad rest for 10 minutes for flavors to meld. Serve chilled.',
      ],
      nutrition: {
        calories: 320,
        protein: 12,
        carbs: 48,
        fat: 10,
        fiber: 8,
      },
      tags: ['healthy', 'vegetarian', 'protein'],
      createdAt: '2024-01-15',
      author: {
        username: 'chef_anna',
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      },
    },
    stats: {
      likes: 156,
      comments: 23,
      saves: 47,
      shares: 12,
    },
    isLiked: true,
    isSaved: false,
  },
     {
     id: '3',
     user: {
       username: 'jiangxu',
       avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
     },
     content: 'Another beautiful sunset today! Nature never fails to amaze me 🌅',
     timeAgo: '11 hours',
     images: [
       'https://picsum.photos/400/300?random=1',
       'https://picsum.photos/400/300?random=2'
     ],
     stats: {
       likes: 124,
       comments: 8,
       shares: 5,
       saves: 32,
     },
     isLiked: true,
     isSaved: true,
   },
  {
    id: '4',
    type: 'recipe',
    user: {
      username: 'healthy_chef',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    },
    caption: 'Perfect protein smoothie bowl for post-workout fuel! 💪',
    timeAgo: '1 day',
    recipe: {
      id: 'recipe_2',
      title: 'Protein-Rich Smoothie Bowl',
      description: 'High-protein smoothie bowl with fresh fruits and granola',
      category: 'Breakfast',
      difficulty: 'Easy',
      cookingTime: 10,
      servings: 1,
      image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=500',
      ingredients: [
        { id: '1', name: 'Frozen banana', amount: 2, unit: 'pieces' },
        { id: '2', name: 'Protein powder (vanilla)', amount: 30, unit: 'g' },
        { id: '3', name: 'Almond milk', amount: 200, unit: 'ml' },
        { id: '4', name: 'Fresh blueberries', amount: 50, unit: 'g' },
        { id: '5', name: 'Granola', amount: 30, unit: 'g' },
        { id: '6', name: 'Chia seeds', amount: 1, unit: 'tbsp' },
        { id: '7', name: 'Sliced almonds', amount: 20, unit: 'g' },
        { id: '8', name: 'Coconut flakes', amount: 10, unit: 'g' },
      ],
      instructions: [
        'Add frozen bananas, protein powder, and almond milk to a blender.',
        'Blend on high speed until smooth and creamy, about 60 seconds.',
        'If mixture is too thick, add more almond milk 1 tablespoon at a time.',
        'Pour smoothie into a bowl.',
        'Arrange fresh blueberries on top of the smoothie.',
        'Sprinkle granola evenly over one section of the bowl.',
        'Add chia seeds, sliced almonds, and coconut flakes as toppings.',
        'Serve immediately with a spoon. Enjoy your protein-packed breakfast!',
      ],
      nutrition: {
        calories: 420,
        protein: 25,
        carbs: 52,
        fat: 8,
        fiber: 12,
      },
      tags: ['protein', 'post-workout', 'breakfast'],
      createdAt: '2024-01-14',
      author: {
        username: 'healthy_chef',
        avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      },
    },
    stats: {
      likes: 203,
      comments: 42,
      saves: 89,
      shares: 18,
    },
    isLiked: true,
    isSaved: true,
  },
     {
     id: '5',
     user: {
       username: 'sarah_ux',
       avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
     },
     content: 'Social app design patterns are evolving. Here are some thoughts on improving user experience in food sharing applications 🍽️',
     timeAgo: '2 days',
     images: [
       'https://picsum.photos/400/300?random=4',
       'https://picsum.photos/400/300?random=5'
     ],
     stats: {
       likes: 89,
       comments: 12,
       shares: 7,
       saves: 23,
     },
     isLiked: false,
     isSaved: false,
   },
];

// Complete mock recipe data for RecipeDetail
const detailedMockRecipe: Recipe = {
  id: 'recipe_detailed',
  title: 'Mediterranean Chickpea Buddha Bowl',
  description: 'A colorful and nutritious bowl packed with Mediterranean flavors, roasted chickpeas, fresh vegetables, and tahini dressing',
  category: 'Main Course',
  difficulty: 'Easy',
  cookingTime: 35,
  servings: 4,
  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800',
  ingredients: [
    { id: '1', name: 'Canned chickpeas', amount: 400, unit: 'g' },
    { id: '2', name: 'Quinoa', amount: 200, unit: 'g' },
    { id: '3', name: 'Cherry tomatoes', amount: 300, unit: 'g' },
    { id: '4', name: 'Cucumber', amount: 2, unit: 'pieces' },
    { id: '5', name: 'Red bell pepper', amount: 1, unit: 'piece' },
    { id: '6', name: 'Red onion', amount: 0.5, unit: 'piece' },
    { id: '7', name: 'Kalamata olives', amount: 100, unit: 'g' },
    { id: '8', name: 'Feta cheese', amount: 150, unit: 'g' },
    { id: '9', name: 'Fresh spinach', amount: 100, unit: 'g' },
    { id: '10', name: 'Tahini', amount: 3, unit: 'tbsp' },
    { id: '11', name: 'Lemon juice', amount: 2, unit: 'tbsp' },
    { id: '12', name: 'Olive oil', amount: 4, unit: 'tbsp' },
    { id: '13', name: 'Garlic cloves', amount: 2, unit: 'pieces' },
    { id: '14', name: 'Paprika', amount: 1, unit: 'tsp' },
    { id: '15', name: 'Cumin', amount: 1, unit: 'tsp' },
  ],
  instructions: [
    'Preheat your oven to 400°F (200°C). Rinse and drain the chickpeas, then pat them dry with paper towels.',
    'In a bowl, toss chickpeas with 2 tbsp olive oil, paprika, cumin, salt, and pepper. Spread on a baking sheet.',
    'Roast chickpeas for 20-25 minutes until crispy and golden, shaking the pan halfway through.',
    'Meanwhile, rinse quinoa and cook according to package instructions (usually 15 minutes in boiling water).',
    'Prepare the tahini dressing: whisk together tahini, lemon juice, minced garlic, remaining olive oil, and 2-3 tbsp water until smooth.',
    'Dice the cucumber, bell pepper, and red onion. Cut cherry tomatoes in half.',
    'Crumble the feta cheese and wash the spinach leaves thoroughly.',
    'Once quinoa is cooked, fluff with a fork and let it cool slightly.',
    'Assemble the bowls: divide quinoa among 4 bowls as the base.',
    'Top each bowl with roasted chickpeas, fresh vegetables, olives, and feta cheese.',
    'Add fresh spinach leaves and drizzle generously with tahini dressing.',
    'Garnish with extra herbs if desired and serve immediately while chickpeas are still warm.',
  ],
  nutrition: {
    calories: 485,
    protein: 18,
    carbs: 52,
    fat: 22,
    fiber: 12,
    sugar: 8,
  },
  tags: ['mediterranean', 'vegetarian', 'healthy', 'protein-rich', 'gluten-free'],
  createdAt: '2024-01-20',
  author: {
    username: 'mediterranean_chef',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
  },
};

export default function Home() {
  const router = useRouter();
  const { navigateToProfile } = useUserNavigation();
  const [posts, setPosts] = useState<AllPostData[]>(mockPosts);
  const [refreshing, setRefreshing] = useState(false);
  const [commentsModalVisible, setCommentsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string>('');
  const [postComments, setPostComments] = useState<{ [postId: string]: Comment[] }>(MOCK_POST_COMMENTS);
  
  // Recipe Detail Modal State
  const [recipeDetailVisible, setRecipeDetailVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeStats, setRecipeStats] = useState({
    likes: 342,
    comments: 67,
    saves: 128,
    shares: 45,
  });
  const [isRecipeLiked, setIsRecipeLiked] = useState(false);
  const [isRecipeSaved, setIsRecipeSaved] = useState(false);

  // Post More Modal State
  const [moreModalVisible, setMoreModalVisible] = useState(false);
  const [selectedPost, setSelectedPost] = useState<AllPostData | null>(null);

  // Share Post Modal State
  const [shareModalVisible, setShareModalVisible] = useState(false);
  const [selectedSharePost, setSelectedSharePost] = useState<AllPostData | null>(null);

  // Feed Selector Modal State
  const [feedSelectorVisible, setFeedSelectorVisible] = useState(false);
  const [selectedFeedType, setSelectedFeedType] = useState<FeedType>('foryou');

  // Feed selector handler
  const handleFeedSelectorPress = () => {
    setFeedSelectorVisible(true);
  };

  // Navigation handlers
  const handleSearchPress = () => {
    router.push('/(main)/search');
  };

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newLikedState = !post.isLiked;
          return {
            ...post,
            isLiked: newLikedState,
            stats: {
              ...post.stats,
              likes: newLikedState ? post.stats.likes + 1 : post.stats.likes - 1
            }
          } as AllPostData;
        }
        return post;
      })
    );
  };

  const handleComment = (postId: string) => {
    setSelectedPostId(postId);
    setCommentsModalVisible(true);
  };

  const handleShare = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedSharePost(post);
      setShareModalVisible(true);
    }
  };

  const handlePostShare = (postId: string, caption?: string) => {
    console.log('Sharing post:', postId, caption ? `with caption: "${caption}"` : 'without caption');
    
    // Update share count
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            stats: {
              ...post.stats,
              shares: post.stats.shares + 1
            }
          } as AllPostData;
        }
        return post;
      })
    );
    
    // In a real app, you would send this to your backend
    // Example: API.sharePost(postId, caption);
  };

  const handleSave = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          const newSavedState = !post.isSaved;
          if ('type' in post && post.type === 'recipe') {
            return {
              ...post,
              isSaved: newSavedState,
              stats: {
                ...post.stats,
                saves: newSavedState ? post.stats.saves + 1 : post.stats.saves - 1
              }
            } as RecipePostData;
          } else {
            // Status post
            return {
              ...post,
              isSaved: newSavedState,
              stats: {
                ...post.stats,
                saves: post.stats.saves !== undefined 
                  ? (newSavedState ? post.stats.saves + 1 : post.stats.saves - 1)
                  : (newSavedState ? 1 : 0)
              }
            } as AllPostData;
          }
        }
        return post;
      })
    );
  };

  const handleUserPress = (username: string) => {
    navigateToProfile(username, { source: 'home' });
  };

  // Comment handlers
  const handleAddComment = (content: string) => {
    if (selectedPostId && content.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        user: {
          id: 'current-user',
          username: 'you',
          displayName: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        content,
        timeAgo: 'now',
        timestamp: new Date(),
        likes: 0,
        isLiked: false,
        replies: [],
        replyCount: 0,
      };
      
      setPostComments(prev => ({
        ...prev,
        [selectedPostId]: [newComment, ...(prev[selectedPostId] || [])]
      }));
      
      // Update comment count in post stats
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === selectedPostId) {
            return {
              ...post,
              stats: {
                ...post.stats,
                comments: post.stats.comments + 1
              }
            } as AllPostData;
          }
          return post;
        })
      );
    }
  };

  const handleCommentLike = (commentId: string) => {
    setPostComments(prev => ({
      ...prev,
      [selectedPostId]: prev[selectedPostId]?.map(comment => 
        comment.id === commentId 
          ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
          : comment
      ) || []
    }));
  };

  const handleCommentReply = (commentId: string, parentComment: Comment) => {
    // Add reply to the comment
    const newReply: Comment = {
      id: Date.now().toString(),
      user: {
        id: 'current-user',
        username: 'you',
        displayName: 'You',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      },
      content: `@${parentComment.user.username} Great point! I totally agree with you.`,
      timeAgo: 'now',
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
      replyCount: 0,
      parentId: commentId,
      isReply: true,
    };
    
    // Update the comments to add reply to parent
    setPostComments(prev => ({
      ...prev,
      [selectedPostId]: prev[selectedPostId]?.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              replies: [...(comment.replies || []), newReply],
              replyCount: (comment.replyCount || 0) + 1
            }
          : comment
      ) || []
    }));
    
    console.log('Reply added to comment:', commentId, parentComment.content);
  };

  const handleCommentUserPress = (userId: string) => {
    console.log('Navigate to user profile from comment:', userId);
    // In a real app, this would navigate to the user's profile
  };

  const handleViewRecipe = (postId: string) => {
    console.log('View recipe:', postId);
    // Find the recipe from posts or use detailed mock data
    const post = posts.find(p => p.id === postId);
    if (post && 'type' in post && post.type === 'recipe') {
      setSelectedRecipe(detailedMockRecipe); // Use detailed mock with instructions
      setRecipeStats({
        likes: post.stats.likes,
        comments: post.stats.comments,
        saves: post.stats.saves,
        shares: post.stats.shares,
      });
      setIsRecipeLiked(post.isLiked || false);
      setIsRecipeSaved(post.isSaved || false);
      setRecipeDetailVisible(true);
    }
  };

  // Recipe Detail Handlers
  const handleRecipeBack = () => {
    setRecipeDetailVisible(false);
    setSelectedRecipe(null);
  };

  const handleRecipeLike = () => {
    setIsRecipeLiked(!isRecipeLiked);
    setRecipeStats(prev => ({
      ...prev,
      likes: isRecipeLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleRecipeSave = () => {
    setIsRecipeSaved(!isRecipeSaved);
    setRecipeStats(prev => ({
      ...prev,
      saves: isRecipeSaved ? prev.saves - 1 : prev.saves + 1
    }));
  };

  const handleRecipeShare = () => {
    setRecipeStats(prev => ({
      ...prev,
      shares: prev.shares + 1
    }));
    console.log('Recipe shared!');
  };

  const handleRecipeComment = () => {
    console.log('Recipe comments opened');
  };

  // Post More Handlers
  const handleMorePress = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setMoreModalVisible(true);
    }
  };

  const handleEditPost = () => {
    Alert.alert('Edit Post', 'Edit functionality will be implemented here');
  };

  const handleDeletePost = () => {
    if (selectedPost) {
      Alert.alert(
        'Delete Post',
        'Are you sure you want to delete this post?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => {
              setPosts(prev => prev.filter(p => p.id !== selectedPost.id));
              setMoreModalVisible(false);
            }
          }
        ]
      );
    }
  };

  const handleNotInterested = () => {
    if (selectedPost) {
      setPosts(prev => prev.filter(p => p.id !== selectedPost.id));
      setMoreModalVisible(false);
      Alert.alert('Not Interested', 'We\'ll show you fewer posts like this');
    }
  };

  const handleUnfollow = () => {
    if (selectedPost) {
      Alert.alert(
        'Unfollow',
        `Unfollow @${selectedPost.user.username}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Unfollow',
            onPress: () => {
              setMoreModalVisible(false);
              Alert.alert('Unfollowed', `You unfollowed @${selectedPost.user.username}`);
            }
          }
        ]
      );
    }
  };

  const handleReportPost = () => {
    Alert.alert(
      'Report Post',
      'What\'s wrong with this post?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Report',
          style: 'destructive',
          onPress: () => {
            setMoreModalVisible(false);
            Alert.alert('Reported', 'Thanks for letting us know');
          }
        }
      ]
    );
  };

  // Check if post belongs to current user (mock logic)
  const isOwnPost = (post: AllPostData) => {
    // In real app, compare with current user ID
    return post.user.username === 'vt18122004'; // Mock current user
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderPost = ({ item }: { item: AllPostData }) => (
    <PostCard
      data={item}
      onLike={() => handleLike(item.id)}
      onComment={() => handleComment(item.id)}
      onShare={() => handleShare(item.id)}
      onSave={() => handleSave(item.id)}
      onUserPress={() => handleUserPress(item.user.username)}
      onViewRecipe={() => handleViewRecipe(item.id)}
      onMorePress={() => handleMorePress(item.id)}
    />
  );

  return (
    <MainLayout 
      activeTab="home" 
      onTabPress={(tab: string) => console.log('Tab pressed:', tab)}
      headerProps={{
        variant: 'center-logo',
        showLogo: true,
        leftButton: {
          icon: 'menu',
          onPress: handleFeedSelectorPress,
        },
        rightButton: {
          icon: 'search',
          onPress: handleSearchPress,
        }
      }}
    >
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.gray}
          />
        }
      />

      <CommentsModal
        visible={commentsModalVisible}
        onClose={() => setCommentsModalVisible(false)}
        postId={selectedPostId}
        comments={postComments[selectedPostId] || []}
        onAddComment={handleAddComment}
        onLike={handleCommentLike}
        onReply={handleCommentReply}
        onUserPress={handleCommentUserPress}
      />

      {/* Recipe Detail Modal */}
      <Modal
        visible={recipeDetailVisible}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedRecipe && (
          <RecipeDetail
            recipe={selectedRecipe}
            isLiked={isRecipeLiked}
            isSaved={isRecipeSaved}
            stats={recipeStats}
            onBack={handleRecipeBack}
            onLike={handleRecipeLike}
            onSave={handleRecipeSave}
            onShare={handleRecipeShare}
            onComment={handleRecipeComment}
          />
        )}
      </Modal>

      {/* Post More Modal */}
      <PostMoreModal
        visible={moreModalVisible}
        onClose={() => setMoreModalVisible(false)}
        isOwnPost={selectedPost ? isOwnPost(selectedPost) : false}
        userName={selectedPost?.user.username}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
        onNotInterested={handleNotInterested}
        onUnfollow={handleUnfollow}
        onReport={handleReportPost}
      />

      {/* Share Post Modal */}
      {selectedSharePost && (
        <SharePostModal
          visible={shareModalVisible}
          onClose={() => setShareModalVisible(false)}
          post={{
            ...selectedSharePost,
            content: 'type' in selectedSharePost && selectedSharePost.type === 'recipe' 
              ? (selectedSharePost as any).caption || '' 
              : (selectedSharePost as any).content
          }}
          onShare={handlePostShare}
        />
      )}

      {/* Feed Selector Modal */}
      <FeedSelectorModal
        visible={feedSelectorVisible}
        onClose={() => setFeedSelectorVisible(false)}
        selectedFeed={selectedFeedType}
        onFeedSelect={(type: FeedType) => {
          setSelectedFeedType(type);
          console.log('Selected feed type:', type);
        }}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
}); 