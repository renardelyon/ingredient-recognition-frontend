import { apiClient } from "./config";
import type {
  RecipeRecommendationResponse,
  Recipe,
  SavedRecipe,
  RecipeResponse,
} from "../types";

export const recipeService = {
  /**
   * Get recipe recommendations based on ingredients
   * @param ingredients - Array of ingredient names
   * @returns Promise with recommended recipes
   */
  getRecommendations: async (
    ingredients: string[]
  ): Promise<RecipeRecommendationResponse> => {
    const response = await apiClient.post<RecipeRecommendationResponse>(
      "/api/v1/recipes/recommend",
      { ingredients }
    );

    return response.data;
  },

  /**
   * Get a single recipe by ID
   * @param recipeId - The recipe ID
   * @returns Promise with recipe details
   */
  getRecipeById: async (recipeId: string): Promise<Recipe> => {
    const response = await apiClient.get<Recipe>(`/api/v1/recipes/${recipeId}`);
    return response.data;
  },

  /**
   * Save a recipe to user's saved recipes
   * @param recipe - The recipe to save
   * @returns Promise with saved recipe
   */
  saveRecipe: async (recipe: Recipe): Promise<SavedRecipe> => {
    const response = await apiClient.post<SavedRecipe>(
      "/api/v1/recipes/saved",
      recipe
    );
    return response.data;
  },

  /**
   * Get all saved recipes for the user
   * @returns Promise with saved recipes
   */
  getSavedRecipes: async (): Promise<RecipeResponse> => {
    const response = await apiClient.get<RecipeResponse>(
      "/api/v1/recipes/saved"
    );
    return response.data;
  },

  /**
   * Remove a recipe from saved recipes
   * @param recipeId - The recipe ID to remove
   */
  removeSavedRecipe: async (recipeId: string): Promise<void> => {
    await apiClient.delete(`/api/v1/recipes/saved/${recipeId}`);
  },
};
