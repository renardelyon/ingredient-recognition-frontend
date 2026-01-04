import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ingredientService, recipeService } from "../api";
import type { Recipe } from "../types";

// Query keys
export const queryKeys = {
  ingredients: ["ingredients"] as const,
  recipes: ["recipes"] as const,
  savedRecipes: ["savedRecipes"] as const,
  recipeById: (id: string) => ["recipe", id] as const,
};

/**
 * Hook to recognize ingredients from an uploaded image
 */
export const useRecognizeIngredients = () => {
  return useMutation({
    mutationFn: (imageFile: File) =>
      ingredientService.recognizeIngredients(imageFile),
  });
};

/**
 * Hook to get recipe recommendations based on ingredients
 */
export const useGetRecommendations = () => {
  return useMutation({
    mutationFn: (ingredients: string[]) =>
      recipeService.getRecommendations(ingredients),
  });
};

/**
 * Hook to get a single recipe by ID
 */
export const useGetRecipeById = (recipeId: string) => {
  return useQuery({
    queryKey: queryKeys.recipeById(recipeId),
    queryFn: () => recipeService.getRecipeById(recipeId),
    enabled: !!recipeId,
  });
};

/**
 * Hook to get all saved recipes
 */
export const useGetSavedRecipes = () => {
  return useQuery({
    queryKey: queryKeys.savedRecipes,
    queryFn: () => recipeService.getSavedRecipes(),
  });
};

/**
 * Hook to save a recipe
 */
export const useSaveRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipe: Recipe) => recipeService.saveRecipe(recipe),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedRecipes });
    },
  });
};

/**
 * Hook to remove a saved recipe
 */
export const useRemoveSavedRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => recipeService.removeSavedRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedRecipes });
    },
  });
};
