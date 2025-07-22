import { useQuery, useMutation } from '@apollo/client'
import { 
  GET_POSTS_QUERY, 
  GET_POST_QUERY, 
  LIKE_POST_MUTATION, 
  SAVE_POST_MUTATION,
  CREATE_POST_MUTATION,
  DELETE_POST_MUTATION,
  SEARCH_POSTS_QUERY 
} from '@/graphql/queries/posts'
import { Alert } from 'react-native'

interface UsePostsOptions {
  first?: number
  type?: 'STATUS' | 'RECIPE'
  category?: string
  difficulty?: string
  cuisine?: string
}

interface PostContent {
  text?: string
  images?: string[]
  recipe?: {
    title: string
    ingredients: Array<{
      id: string
      name: string
      amount: number
      unit: string
      optional?: boolean
    }>
    instructions: Array<{
      step: number
      text: string
      image?: string
    }>
    nutrition?: {
      calories?: number
      protein?: number
      carbs?: number
      fat?: number
      fiber?: number
    }
    tags?: string[]
    difficulty?: string
    category?: string
    cuisine?: string
    prepTime?: number
    cookTime?: number
    servings?: number
  }
}

export const usePosts = (options: UsePostsOptions = {}) => {
  const { first = 20, type, category, difficulty, cuisine } = options
  
  // Get posts with pagination
  const { 
    data, 
    loading, 
    error, 
    fetchMore, 
    refetch 
  } = useQuery(GET_POSTS_QUERY, {
    variables: { first, type, category, difficulty, cuisine },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true
  })
  
  // Like post mutation
  const [likePostMutation] = useMutation(LIKE_POST_MUTATION, {
    update: (cache, { data }) => {
      if (data?.likePost) {
        cache.modify({
          id: cache.identify(data.likePost),
          fields: {
            isLiked: () => data.likePost.isLiked,
            stats: (existing: any = {}) => ({
              ...existing,
              likesCount: data.likePost.stats.likesCount
            })
          }
        })
      }
    },
    onError: (error) => {
      console.error('Like post error:', error)
      Alert.alert('Error', 'Failed to like post')
    }
  })
  
  // Save post mutation
  const [savePostMutation] = useMutation(SAVE_POST_MUTATION, {
    update: (cache, { data }) => {
      if (data?.savePost) {
        cache.modify({
          id: cache.identify(data.savePost),
          fields: {
            isSaved: () => data.savePost.isSaved,
            stats: (existing: any = {}) => ({
              ...existing,
              savesCount: data.savePost.stats.savesCount
            })
          }
        })
      }
    },
    onError: (error) => {
      console.error('Save post error:', error)
      Alert.alert('Error', 'Failed to save post')
    }
  })
  
  // Create post mutation
  const [createPostMutation, { loading: createLoading }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [GET_POSTS_QUERY],
    onCompleted: () => {
      Alert.alert('Success', 'Post created successfully!')
    },
    onError: (error) => {
      console.error('Create post error:', error)
      Alert.alert('Error', 'Failed to create post')
    }
  })
  
  // Delete post mutation
  const [deletePostMutation] = useMutation(DELETE_POST_MUTATION, {
    update: (cache, { data }) => {
      if (data?.deletePost) {
        cache.evict({ id: cache.identify(data.deletePost) })
        cache.gc()
      }
    },
    onCompleted: () => {
      Alert.alert('Success', 'Post deleted successfully!')
    },
    onError: (error) => {
      console.error('Delete post error:', error)
      Alert.alert('Error', 'Failed to delete post')
    }
  })
  
  // Load more posts
  const loadMore = async () => {
    if (data?.posts?.pageInfo?.hasNextPage) {
      try {
        await fetchMore({
          variables: {
            after: data.posts.pageInfo.endCursor
          }
        })
      } catch (error) {
        console.error('Load more error:', error)
        Alert.alert('Error', 'Failed to load more posts')
      }
    }
  }
  
  // Like post function
  const likePost = async (postId: string) => {
    try {
      await likePostMutation({
        variables: { postId },
        optimisticResponse: {
          likePost: {
            __typename: 'Post',
            id: postId,
            isLiked: true,
            stats: {
              __typename: 'PostStats',
              likesCount: 0
            }
          }
        }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  // Save post function
  const savePost = async (postId: string) => {
    try {
      await savePostMutation({
        variables: { postId },
        optimisticResponse: {
          savePost: {
            __typename: 'Post',
            id: postId,
            isSaved: true,
            stats: {
              __typename: 'PostStats',
              savesCount: 0
            }
          }
        }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  // Create post function
  const createPost = async (content: PostContent, type: 'STATUS' | 'RECIPE' = 'STATUS') => {
    try {
      const postData = {
        type,
        content,
        // Extract fields for indexing
        ...(type === 'RECIPE' && content.recipe && {
          title: content.recipe.title,
          difficulty: content.recipe.difficulty,
          category: content.recipe.category,
          cuisine: content.recipe.cuisine,
          tags: content.recipe.tags || []
        })
      }
      
      await createPostMutation({
        variables: { data: postData }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  // Delete post function
  const deletePost = async (postId: string) => {
    try {
      await deletePostMutation({
        variables: { id: postId }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  // Parse and format posts
  const posts = data?.posts?.edges?.map((edge: any) => {
    const post = edge.node
    let parsedContent: PostContent = {}
    
    try {
      parsedContent = typeof post.content === 'string' 
        ? JSON.parse(post.content) 
        : post.content
    } catch (error) {
      console.error('Error parsing post content:', error)
      parsedContent = { text: post.content }
    }
    
    return {
      ...post,
      content: parsedContent,
      isRecipe: post.type === 'RECIPE',
      recipeData: post.type === 'RECIPE' ? parsedContent.recipe : null
    }
  }) || []
  
  return {
    // Data
    posts,
    pageInfo: data?.posts?.pageInfo,
    totalCount: data?.posts?.totalCount || 0,
    
    // Loading states
    loading,
    createLoading,
    
    // Actions
    loadMore,
    refetch,
    likePost,
    savePost,
    createPost,
    deletePost,
    
    // Utils
    hasMore: data?.posts?.pageInfo?.hasNextPage || false,
    error
  }
}

// Hook for single post
export const usePost = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_POST_QUERY, {
    variables: { id },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all'
  })
  
  let parsedContent: PostContent = {}
  
  if (data?.post?.content) {
    try {
      parsedContent = typeof data.post.content === 'string' 
        ? JSON.parse(data.post.content) 
        : data.post.content
    } catch (error) {
      console.error('Error parsing post content:', error)
      parsedContent = { text: data.post.content }
    }
  }
  
  return {
    post: data?.post ? {
      ...data.post,
      content: parsedContent,
      isRecipe: data.post.type === 'RECIPE',
      recipeData: data.post.type === 'RECIPE' ? parsedContent.recipe : null
    } : null,
    loading,
    error,
    refetch
  }
}

// Hook for search posts
export const useSearchPosts = (query: string, filters: UsePostsOptions = {}) => {
  const { type, category, difficulty, first = 20 } = filters
  
  const { data, loading, error, fetchMore } = useQuery(SEARCH_POSTS_QUERY, {
    variables: { query, type, category, difficulty, first },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    skip: !query.trim()
  })
  
  const posts = data?.searchPosts?.edges?.map((edge: any) => {
    const post = edge.node
    let parsedContent: PostContent = {}
    
    try {
      parsedContent = typeof post.content === 'string' 
        ? JSON.parse(post.content) 
        : post.content
    } catch (error) {
      console.error('Error parsing post content:', error)
      parsedContent = { text: post.content }
    }
    
    return {
      ...post,
      content: parsedContent,
      isRecipe: post.type === 'RECIPE',
      recipeData: post.type === 'RECIPE' ? parsedContent.recipe : null
    }
  }) || []
  
  return {
    posts,
    loading,
    error,
    hasMore: data?.searchPosts?.pageInfo?.hasNextPage || false,
    loadMore: async () => {
      if (data?.searchPosts?.pageInfo?.hasNextPage) {
        await fetchMore({
          variables: {
            after: data.searchPosts.pageInfo.endCursor
          }
        })
      }
    }
  }
}

export default usePosts 