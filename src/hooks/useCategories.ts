import { useQuery } from "@tanstack/react-query";

import { MealsService } from "@/services/meals";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => MealsService.getCategories(),
  });
};
