import { useState, useCallback } from "react";
import {
  ImageUpload,
  IngredientsList,
  RecipeList,
  RecipeDetailModal,
  Toast,
} from "../components";
import {
  useRecognizeIngredients,
  useGetRecommendations,
  useSaveRecipe,
  useRemoveSavedRecipe,
  useGetSavedRecipes,
} from "../hooks";
import type { Recipe } from "../types";

export const HomePage = () => {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [recognizedIngredients, setRecognizedIngredients] = useState<string[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const recognizeIngredientsMutation = useRecognizeIngredients();
  const getRecommendationsMutation = useGetRecommendations();
  const saveRecipeMutation = useSaveRecipe();
  const removeRecipeMutation = useRemoveSavedRecipe();
  const { data: savedRecipes = [] } = useGetSavedRecipes();

  const savedRecipeIds = savedRecipes.map((r) => r.id);

  const handleImageSelect = useCallback((file: File) => {
    setUploadedImage(file);
    setRecognizedIngredients([]);
    setSelectedIngredients([]);
    setRecommendedRecipes([]);
  }, []);

  const handleIdentifyIngredients = useCallback(async () => {
    if (!uploadedImage) return;

    try {
      const result = await recognizeIngredientsMutation.mutateAsync(
        uploadedImage
      );
      setRecognizedIngredients(result.ingredients);
      setSelectedIngredients(result.ingredients.map((value) => value));
      setRecommendedRecipes([]);
      setToastMessage({
        message: "Ingredients identified successfully!",
        type: "success",
      });
    } catch (error) {
      console.error("Failed to recognize ingredients:", error);
      setToastMessage({
        message:
          error instanceof Error
            ? error.message
            : "Failed to identify ingredients. Please try again.",
        type: "error",
      });
    }
  }, [uploadedImage, recognizeIngredientsMutation]);

  const handleToggleIngredient = useCallback((ingredientName: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((name) => name !== ingredientName)
        : [...prev, ingredientName]
    );
  }, []);

  const handleGetRecipes = useCallback(async () => {
    try {
      const result = await getRecommendationsMutation.mutateAsync(
        selectedIngredients
      );
      setRecommendedRecipes(result.recipes);
    } catch (error) {
      console.error("Failed to get recommendations:", error);
    }
  }, [getRecommendationsMutation, selectedIngredients]);

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
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Discover Recipes from Your Ingredients
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Upload a photo of your ingredients and we'll identify them and
            suggest delicious recipes you can make.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Image Upload Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              1. Upload Your Ingredients Photo
            </h2>
            <ImageUpload onImageSelect={handleImageSelect} isLoading={false} />
            {uploadedImage && (
              <div className="mt-4">
                <button
                  onClick={handleIdentifyIngredients}
                  disabled={recognizeIngredientsMutation.isPending}
                  className="w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {recognizeIngredientsMutation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Identifying Ingredients...
                    </span>
                  ) : (
                    "Identify Ingredients"
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Ingredients Section */}
          {recognizedIngredients.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                2. Select Ingredients
              </h2>
              <IngredientsList
                ingredients={recognizedIngredients}
                selectedIngredients={selectedIngredients}
                onToggleIngredient={handleToggleIngredient}
                onGetRecipes={handleGetRecipes}
                isLoading={getRecommendationsMutation.isPending}
              />
            </div>
          )}

          {/* Recipes Section */}
          {(recommendedRecipes.length > 0 ||
            getRecommendationsMutation.isPending) && (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                3. Recipe Recommendations
              </h2>
              <RecipeList
                recipes={recommendedRecipes}
                savedRecipeIds={savedRecipeIds}
                onSaveRecipe={handleSaveRecipe}
                onRemoveRecipe={handleRemoveRecipe}
                onViewDetails={setSelectedRecipe}
                isLoading={getRecommendationsMutation.isPending}
              />
            </div>
          )}
        </div>
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

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};
