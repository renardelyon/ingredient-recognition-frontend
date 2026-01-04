export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  cookTime: string;
  servings: number;
}

export interface IngredientRecognitionResponse {
  ingredients: string[];
}

export interface RecipeRecommendationResponse {
  recipes: Recipe[];
}

export interface SavedRecipe extends Recipe {
  savedAt: string;
}

export * from "./auth";
