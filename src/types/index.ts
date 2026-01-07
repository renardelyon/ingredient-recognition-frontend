export interface Recipe {
  id?: string;
  name: string;
  cuisine: string;
  cooking_time: string;
  difficulty: string;
  ingredients: string[];
  instructions: string[];
  nutrition: string;
  tips: string;
}

export interface RecipeResponse {
  recipes: Recipe[];
  total: number;
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
