import { useQuery } from "@tanstack/react-query";

import { MealsService } from "../services/meals";

export const useMealsList = (
  category: string | null,
  searchQuery: string | null,
) => {
  return useQuery({
    queryKey: ["meals", "list", category, searchQuery],
    queryFn: () => {
      if (searchQuery) {
        return MealsService.searchMealsByName(searchQuery);
      }

      if (category && category !== "Beef") {
        return MealsService.getMealsByCategory(category);
      }

      return MealsService.getMealsByCategory("Beef");
    },
  });
};
