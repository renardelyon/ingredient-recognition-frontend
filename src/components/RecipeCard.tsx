import { Clock, Users, Bookmark, BookmarkCheck } from "lucide-react";
import type { Recipe } from "../types";

interface RecipeCardProps {
  recipe: Recipe;
  isSaved?: boolean;
  onSave: (recipe: Recipe) => void;
  onRemove?: (recipeId: string) => void;
  onViewDetails?: (recipe: Recipe) => void;
}

export const RecipeCard = ({
  recipe,
  isSaved = false,
  onSave,
  onRemove,
  onViewDetails,
}: RecipeCardProps) => {
  const handleSaveClick = () => {
    if (isSaved && onRemove) {
      onRemove(recipe.id);
    } else {
      onSave(recipe);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {recipe.imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={handleSaveClick}
            className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
              isSaved
                ? "bg-emerald-500 text-white"
                : "bg-white/90 text-gray-600 hover:bg-white hover:text-emerald-600"
            }`}
          >
            {isSaved ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
          </button>
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {recipe.title}
          </h3>
          {!recipe.imageUrl && (
            <button
              onClick={handleSaveClick}
              className={`p-2 rounded-full transition-colors shrink-0 ${
                isSaved
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-emerald-100 hover:text-emerald-600"
              }`}
            >
              {isSaved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            </button>
          )}
        </div>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.prepTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium text-gray-500 uppercase mb-2">
            Ingredients
          </p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 5).map((ingredient, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 5 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{recipe.ingredients.length - 5} more
              </span>
            )}
          </div>
        </div>

        {onViewDetails && (
          <button
            onClick={() => onViewDetails(recipe)}
            className="w-full mt-4 py-2.5 border border-emerald-500 text-emerald-600 rounded-lg font-medium hover:bg-emerald-50 transition-colors"
          >
            View Recipe
          </button>
        )}
      </div>
    </div>
  );
};
