import { RecipeCategory, Difficulty, Unit } from '../constants/strings';

export type PostMode = 'status' | 'recipe';

export interface CreateStatusData {
  content: string;
  images?: string[];
}

export interface CreateRecipeData {
  caption?: string;
  recipe: {
    title: string;
    description?: string;
    category: RecipeCategory;
    difficulty: Difficulty;
    cookingTime: number;
    servings: number;
    image: string;
    ingredients: {
      name: string;
      amount: number;
      unit: Unit;
    }[];
    instructions: string[];
    tags: string[];
  };
}

export type CreatePostData = {
  mode: 'status';
  data: CreateStatusData;
} | {
  mode: 'recipe';
  data: CreateRecipeData;
};

export interface CreatePostFormProps {
  onSubmit: (postData: CreatePostData) => void;
  onCancel: () => void;
  isLoading?: boolean;
} 