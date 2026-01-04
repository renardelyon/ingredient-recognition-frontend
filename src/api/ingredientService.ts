import { apiClient } from "./config";
import type { IngredientRecognitionResponse } from "../types";

export const ingredientService = {
  /**
   * Upload an image to recognize ingredients
   * @param imageFile - The image file to upload
   * @returns Promise with recognized ingredients
   */
  recognizeIngredients: async (
    imageFile: File
  ): Promise<IngredientRecognitionResponse> => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await apiClient.post<IngredientRecognitionResponse>(
      "/api/v1/detect",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};
