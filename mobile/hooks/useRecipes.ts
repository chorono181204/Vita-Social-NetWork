import { useQuery, useMutation } from '@apollo/client'
import { 
  GET_RECIPES_QUERY, 
  GET_RECIPE_QUERY, 
  LIKE_RECIPE_MUTATION, 
  SAVE_RECIPE_MUTATION,
  CREATE_RECIPE_MUTATION,
  DELETE_RECIPE_MUTATION 
} from '@/graphql/queries/recipes'
import { Alert } from 'react-native'

interface UseRecipesOptions {
  first?: number
  category?: string
  difficulty?: string
  cuisine?: string
}

export const useRecipes = (options: UseRecipesOptions = {}) => {
  const { first = 20, category, difficulty, cuisine } = options
  
  // Get recipes with pagination
  const { 
    data, 
    loading, 
    error, 
    fetchMore, 
    refetch 
  } = useQuery(GET_RECIPES_QUERY, {
    variables: { first, category, difficulty, cuisine },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true
  })
  
  // Like recipe mutation
  const [likeRecipeMutation] = useMutation(LIKE_RECIPE_MUTATION, {
    update: (cache, { data }) => {
      if (data?.likeRecipe) {
        // Apollo tự động update cache dựa trên id
        cache.modify({
          id: cache.identify(data.likeRecipe),
          fields: {
            isLiked: () => data.likeRecipe.isLiked,
            stats: (existing: any = {}) => ({
              ...existing,
              likesCount: data.likeRecipe.stats.likesCount
            })
          }
        })
      }
    },
    onError: (error) => {
      console.error('Like recipe error:', error)
      Alert.alert('Error', 'Failed to like recipe')
    }
  })
  
  // Save recipe mutation
  const [saveRecipeMutation] = useMutation(SAVE_RECIPE_MUTATION, {
    update: (cache, { data }) => {
      if (data?.saveRecipe) {
        cache.modify({
          id: cache.identify(data.saveRecipe),
          fields: {
            isSaved: () => data.saveRecipe.isSaved,
            stats: (existing: any = {}) => ({
              ...existing,
              savesCount: data.saveRecipe.stats.savesCount
            })
          }
        })
      }
    },
    onError: (error) => {
      console.error('Save recipe error:', error)
      Alert.alert('Error', 'Failed to save recipe')
    }
  })
  
  // Create recipe mutation
  const [createRecipeMutation, { loading: createLoading }] = useMutation(CREATE_RECIPE_MUTATION, {
    refetchQueries: [GET_RECIPES_QUERY],
    onCompleted: () => {
      Alert.alert('Success', 'Recipe created successfully!')
    },
    onError: (error) => {
      console.error('Create recipe error:', error)
      Alert.alert('Error', 'Failed to create recipe')
    }
  })
  
  // Delete recipe mutation
  const [deleteRecipeMutation] = useMutation(DELETE_RECIPE_MUTATION, {
    update: (cache, { data }) => {
      if (data?.deleteRecipe) {
        // Remove from cache
        cache.evict({ id: cache.identify(data.deleteRecipe) })
        cache.gc()
      }
    },
    onCompleted: () => {
      Alert.alert('Success', 'Recipe deleted successfully!')
    },
    onError: (error) => {
      console.error('Delete recipe error:', error)
      Alert.alert('Error', 'Failed to delete recipe')
    }
  })
  
  // Load more recipes
  const loadMore = async () => {
    if (data?.recipes?.pageInfo?.hasNextPage) {
      try {
        await fetchMore({
          variables: {
            after: data.recipes.pageInfo.endCursor
          }
        })
      } catch (error) {
        console.error('Load more error:', error)
        Alert.alert('Error', 'Failed to load more recipes')
      }
    }
  }
  
  // Like recipe function
  const likeRecipe = async (recipeId: string) => {
    try {
      await likeRecipeMutation({
        variables: { recipeId },
        // Optimistic response for instant UI update
        optimisticResponse: {
          likeRecipe: {
            __typename: 'Recipe',
            id: recipeId,
            isLiked: true, // Assume it will be liked
            stats: {
              __typename: 'RecipeStats',
              likesCount: 0 // Will be updated from server
            }
          }
        }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  // Save recipe function
  const saveRecipe = async (recipeId: string) => {
    try {
      await saveRecipeMutation({
        variables: { recipeId },
        optimisticResponse: {
          saveRecipe: {
            __typename: 'Recipe',
            id: recipeId,
            isSaved: true,
            stats: {
              __typename: 'RecipeStats',
              savesCount: 0
            }
          }
        }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  // Create recipe function
  const createRecipe = async (recipeData: any) => {
    try {
      await createRecipeMutation({
        variables: { data: recipeData }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  // Delete recipe function
  const deleteRecipe = async (recipeId: string) => {
    try {
      await deleteRecipeMutation({
        variables: { id: recipeId }
      })
    } catch (error) {
      // Error handled in mutation
    }
  }
  
  return {
    // Data
    recipes: data?.recipes?.edges?.map((edge: any) => edge.node) || [],
    pageInfo: data?.recipes?.pageInfo,
    totalCount: data?.recipes?.totalCount || 0,
    
    // Loading states
    loading,
    createLoading,
    
    // Actions
    loadMore,
    refetch,
    likeRecipe,
    saveRecipe,
    createRecipe,
    deleteRecipe,
    
    // Utils
    hasMore: data?.recipes?.pageInfo?.hasNextPage || false,
    error
  }
}

// Hook for single recipe
export const useRecipe = (id: string) => {
  const { data, loading, error, refetch } = useQuery(GET_RECIPE_QUERY, {
    variables: { id },
    fetchPolicy: 'cache-first',
    errorPolicy: 'all'
  })
  
  return {
    recipe: data?.recipe,
    loading,
    error,
    refetch
  }
}

export default useRecipes 