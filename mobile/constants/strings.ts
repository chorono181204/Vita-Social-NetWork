export const STRINGS = {
  // Post Type Selector
  POST_TYPE: {
    STATUS: 'Status',
    RECIPE: 'Recipe',
    STATUS_SUBTITLE: 'Share your thoughts',
    RECIPE_SUBTITLE: 'Share delicious recipes',
    SELECT_POST_TYPE: 'Select post type'
  },

  // Status Form
  STATUS: {
    ERROR: 'Error',
    CONTENT_REQUIRED: 'Please enter post content',
    CONTENT_LABEL: 'Content',
    PLACEHOLDER: 'What\'s on your mind?',
    IMAGES_LABEL: 'Images',
    ADD_IMAGE: 'Add image',
    POSTING: 'Posting...',
    POST: 'Post',
    CHARACTER_LIMIT: 'Maximum 4 images allowed'
  },

  // Recipe Form
  RECIPE: {
    ERROR: 'Error',
    TITLE_REQUIRED: 'Please enter dish name',
    IMAGE_REQUIRED: 'Please add dish image',
    INGREDIENTS_REQUIRED: 'Please fill in ingredient information',
    INSTRUCTIONS_REQUIRED: 'Please fill in cooking steps',
    
    // Sections
    CAPTION_OPTIONAL: 'Caption (optional)',
    CAPTION_PLACEHOLDER: 'Share the story of your dish...',
    BASIC_INFO: 'Basic Information',
    
    // Basic fields
    DISH_NAME: 'Dish name',
    DISH_NAME_PLACEHOLDER: 'e.g. Healthy quinoa salad',
    DESCRIPTION: 'Description',
    DESCRIPTION_PLACEHOLDER: 'Brief description of the dish...',
    COOKING_TIME: 'Time (minutes)',
    SERVINGS: 'Servings',
    
    // Category & Difficulty
    CATEGORY: 'Category',
    DIFFICULTY: 'Difficulty',
    
    // Media
    DISH_IMAGE: 'Dish image',
    ADD_IMAGE: 'Add image',
    
    // Ingredients
    INGREDIENTS: 'Ingredients',
    ADD_INGREDIENT: 'Add ingredient',
    INGREDIENT_NAME: 'Ingredient name',
    AMOUNT: 'Amount',
    UNIT: 'Unit',
    SELECT_UNIT: 'Select Unit',
    
    // Instructions
    INSTRUCTIONS: 'Instructions',
    ADD_STEP: 'Add step',
    STEP_PLACEHOLDER: 'Describe this step...',
    
    // Tags
    TAGS: 'Tags',
    TAGS_PLACEHOLDER: 'healthy, vegetarian, quick...',
    
    // Nutrition (for future)
    NUTRITION_INFO: 'Nutrition Information',
    CALORIES: 'Calories',
    PROTEIN: 'Protein (g)',
    CARBS: 'Carbs (g)',
    FAT: 'Fat (g)',
    
    // Actions
    POSTING: 'Posting...',
    POST_RECIPE: 'Post Recipe'
  },

  // Create Post Modal
  MODAL: {
    CREATE_POST: 'Create Post',
    SELECT_TYPE_SUBTITLE: 'Choose the type of post you want to create',
    POST_STATUS: 'Post Status',
    POST_RECIPE: 'Post Recipe',
    STATUS_SUBTITLE: 'Share your thoughts',
    RECIPE_SUBTITLE: 'Share healthy cooking recipes',
    CONTINUE: 'Continue'
  },

  // Categories
  CATEGORIES: {
    BREAKFAST: 'Breakfast',
    LUNCH: 'Lunch',
    DINNER: 'Dinner',
    MAIN_COURSE: 'Main Course',
    DESSERT: 'Dessert',
    BEVERAGES: 'Beverages',
    SNACKS: 'Snacks',
    SALADS: 'Salads',
    SOUPS: 'Soups'
  },

  // Difficulties
  DIFFICULTIES: {
    EASY: 'Easy',
    MEDIUM: 'Medium',
    HARD: 'Hard'
  },

  // Units
  UNITS: {
    GRAMS: 'g',
    KILOGRAMS: 'kg',
    MILLILITERS: 'ml',
    LITERS: 'l',
    TABLESPOONS: 'tbsp',
    TEASPOONS: 'tsp',
    CUPS: 'cup',
    PIECES: 'pieces',
    SLICES: 'slices'
  },

  // Common
  COMMON: {
    REQUIRED: 'Required',
    OPTIONAL: 'Optional',
    CANCEL: 'Cancel',
    SAVE: 'Save',
    DELETE: 'Delete',
    EDIT: 'Edit',
    BACK: 'Back',
    NEXT: 'Next',
    DONE: 'Done'
  }
};

export type RecipeCategory = keyof typeof STRINGS.CATEGORIES;
export type Difficulty = keyof typeof STRINGS.DIFFICULTIES;
export type Unit = keyof typeof STRINGS.UNITS; 