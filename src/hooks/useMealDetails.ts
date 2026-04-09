import { useQuery } from "@tanstack/react-query";

import { MealsService } from "@/services/meals";

export const useMealDetails = (id: string) => {
  return useQuery({
    queryKey: ["meal", id],
    queryFn: async () => MealsService.getMealById(id),
    enabled: !!id,
  });
};
