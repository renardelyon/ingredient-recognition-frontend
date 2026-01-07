import { X, Clock, ChefHat, Lightbulb, Utensils } from "lucide-react";
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
    if (isSaved && recipe.id) {
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
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            {/* Title and metadata */}
            <div className="flex items-start justify-between gap-4 mb-4 mr-10">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {recipe.name}
                </h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
                    {recipe.cuisine}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {recipe.difficulty}
                  </span>
                </div>
              </div>
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

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <Clock size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Cooking Time</p>
                  <p className="text-sm font-medium">{recipe.cooking_time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <ChefHat size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Difficulty</p>
                  <p className="text-sm font-medium">{recipe.difficulty}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                <Utensils size={18} className="text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Cuisine</p>
                  <p className="text-sm font-medium">{recipe.cuisine}</p>
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
            <div className="mb-6">
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

            {/* Nutrition */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Nutrition
              </h3>
              <p className="text-gray-600 text-sm">{recipe.nutrition}</p>
            </div>

            {/* Tips */}
            <div className="p-4 bg-emerald-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb size={18} className="text-emerald-600" />
                <h3 className="text-lg font-semibold text-gray-800">Tips</h3>
              </div>
              <p className="text-gray-600 text-sm">{recipe.tips}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
