import { X, Clock, Users, ChefHat } from "lucide-react";
import type { Recipe } from "../types";

interface RecipeDetailModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onSave: (recipe: Recipe) => void;
  onRemove: (recipeId: string) => void;
}

export const RecipeDetailModal = ({
  recipe,
  isOpen,
  onClose,
  isSaved,
  onSave,
  onRemove,
}: RecipeDetailModalProps) => {
  if (!isOpen) return null;

  const handleSaveClick = () => {
    if (isSaved) {
      onRemove(recipe.id);
    } else {
      onSave(recipe);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
      />
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          {/* Header with image */}
          {recipe.imageUrl && (
            <div className="relative h-64">
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}

          {!recipe.imageUrl && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
            >
              <X size={20} />
            </button>
          )}

          <div className="p-6">
            {/* Title and metadata */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {recipe.title}
              </h2>
              <button
                onClick={handleSaveClick}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isSaved
                    ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {isSaved ? "Saved" : "Save Recipe"}
              </button>
            </div>

            <p className="text-gray-600 mb-6">{recipe.description}</p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <Clock size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Prep Time</p>
                  <p className="text-sm font-medium">{recipe.prepTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <ChefHat size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Cook Time</p>
                  <p className="text-sm font-medium">{recipe.cookTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <Users size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Servings</p>
                  <p className="text-sm font-medium">{recipe.servings}</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Ingredients
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 text-gray-600"
                  >
                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Instructions
              </h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-4">
                    <span className="shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </span>
                    <p className="text-gray-600 pt-1">{instruction}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
