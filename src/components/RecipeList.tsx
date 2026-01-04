import type { Recipe } from "../types";
import { RecipeCard } from "./RecipeCard";

interface RecipeListProps {
  recipes: Recipe[];
  savedRecipeIds: string[];
  onSaveRecipe: (recipe: Recipe) => void;
  onRemoveRecipe: (recipeId: string) => void;
  onViewDetails?: (recipe: Recipe) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

export const RecipeList = ({
  recipes,
  savedRecipeIds,
  onSaveRecipe,
  onRemoveRecipe,
  onViewDetails,
  isLoading = false,
  emptyMessage = "No recipes found",
}: RecipeListProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-200" />
            <div className="p-5">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 rounded w-20" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          isSaved={savedRecipeIds.includes(recipe.id)}
          onSave={onSaveRecipe}
          onRemove={onRemoveRecipe}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};
