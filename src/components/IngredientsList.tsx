import { Check } from "lucide-react";

interface IngredientsListProps {
  ingredients: string[];
  selectedIngredients: string[];
  onToggleIngredient: (ingredientName: string) => void;
  onGetRecipes: () => void;
  isLoading?: boolean;
}

export const IngredientsList = ({
  ingredients,
  selectedIngredients,
  onToggleIngredient,
  onGetRecipes,
  isLoading = false,
}: IngredientsListProps) => {
  if (ingredients.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Recognized Ingredients
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Select the ingredients you want to use for recipe recommendations
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {ingredients.map((ingredient, index) => {
          const isSelected = selectedIngredients.includes(ingredient);
          return (
            <button
              key={index}
              onClick={() => onToggleIngredient(ingredient)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isSelected
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {isSelected ? <Check size={16} /> : null}
              {ingredient}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {selectedIngredients.length} ingredient
          {selectedIngredients.length !== 1 ? "s" : ""} selected
        </p>
        <button
          onClick={onGetRecipes}
          disabled={selectedIngredients.length === 0 || isLoading}
          className="px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
              Finding Recipes...
            </span>
          ) : (
            "Get Recipe Recommendations"
          )}
        </button>
      </div>
    </div>
  );
};
