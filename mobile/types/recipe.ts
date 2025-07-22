export interface Recipe {
  id: string;
  title: string;
  description?: string;
  category: RecipeCategory;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cookingTime: number; // minutes
  servings: number;
  image: string;
  ingredients: Ingredient[];
  instructions: string[];
  nutrition: NutritionInfo;
  tags: string[];
  createdAt: string;
  author: {
    username: string;
    avatar: string;
  };
}

export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string; // 'g', 'ml', 'tbsp', 'cup', 'piece'
}

export interface NutritionInfo {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
}

export type RecipeCategory = 
  | 'Breakfast' 
  | 'Lunch' 
  | 'Dinner' 
  | 'Main Course' 
  | 'Dessert' 
  | 'Beverages' 
  | 'Snacks' 
  | 'Salad' 
  | 'Soup';

export interface RecipePostData {
  id: string;
  type: 'recipe';
  user: {
    username: string;
    avatar: string;
    displayName?: string;
  };
  caption?: string;
  timeAgo: string;
  recipe: Recipe;
  stats: {
    likes: number;
    comments: number;
    saves: number;
    shares: number;
  };
  isLiked?: boolean;
  isSaved?: boolean;
} 