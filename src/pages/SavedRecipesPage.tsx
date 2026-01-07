import { useState, useCallback, useMemo } from "react";
import { Bookmark } from "lucide-react";
import { RecipeList, RecipeDetailModal } from "../components";
import {
  useGetSavedRecipes,
  useRemoveSavedRecipe,
  useSaveRecipe,
} from "../hooks";
import type { Recipe } from "../types";

export const SavedRecipesPage = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const { data: savedRecipesData, isLoading } = useGetSavedRecipes();
  const saveRecipeMutation = useSaveRecipe();
  const removeRecipeMutation = useRemoveSavedRecipe();

  const savedRecipeIds = useMemo(
    () => savedRecipesData?.recipes?.map((r) => r.id) || [],
    [savedRecipesData]
  );

  const handleSaveRecipe = useCallback(
    async (recipe: Recipe) => {
      try {
        await saveRecipeMutation.mutateAsync(recipe);
      } catch (error) {
        console.error("Failed to save recipe:", error);
      }
    },
    [saveRecipeMutation]
  );

  const handleRemoveRecipe = useCallback(
    async (recipeId: string) => {
      try {
        await removeRecipeMutation.mutateAsync(recipeId);
      } catch (error) {
        console.error("Failed to remove recipe:", error);
      }
    },
    [removeRecipeMutation]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-emerald-100 rounded-xl">
            <Bookmark className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Saved Recipes</h1>
            <p className="text-gray-500">
              {savedRecipesData?.recipes?.length || 0} recipe
              {(savedRecipesData?.recipes?.length || 0) !== 1 ? "s" : ""} saved
            </p>
          </div>
        </div>

        {/* Recipe List */}
        <RecipeList
          recipes={
            Array.isArray(savedRecipesData?.recipes)
              ? savedRecipesData.recipes
              : []
          }
          onSaveRecipe={handleSaveRecipe}
          onRemoveRecipe={handleRemoveRecipe}
          onViewDetails={setSelectedRecipe}
          isLoading={isLoading}
          emptyMessage="No saved recipes yet. Start by scanning your ingredients!"
        />
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          isOpen={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          isSaved={savedRecipeIds.includes(selectedRecipe.id)}
          onSave={handleSaveRecipe}
          onRemove={handleRemoveRecipe}
        />
      )}
    </div>
  );
};
