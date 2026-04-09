import { api } from "../lib/axios";

export const MealsService = {
  searchMealsByName: async (query: string) => {
    const response = await api.get(`/search.php?s=${query}`);
    return response.data.meals || [];
  },

  getMealById: async (id: string) => {
    const response = await api.get(`/lookup.php?i=${id}`);
    return response.data.meals ? response.data.meals[0] : null;
  },

  getCategories: async () => {
    const response = await api.get("/categories.php");
    return response.data.categories || [];
  },

  getMealsByCategory: async (category: string) => {
    const response = await api.get(`/filter.php?c=${category}`);
    return response.data.meals || [];
  },
};
