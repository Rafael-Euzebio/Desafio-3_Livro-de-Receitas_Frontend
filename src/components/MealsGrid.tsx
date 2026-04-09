import { useSearchParams } from "react-router";

import type { MealItem } from "@/constants/meal";
import { useMealsList } from "@/hooks/useMealsList";

import { MealCard } from "./MealCard";

export const MealsGrid = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "Beef";
  const searchQuery = searchParams.get("q");

  const { data: meals, isLoading } = useMealsList(category, searchQuery);

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="font-medium text-slate-500">Buscando pratos...</p>
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="flex h-40 flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-slate-700">
          Nenhum prato encontrado.
        </p>
        <p className="text-slate-500">
          Tente buscar por outro nome ou categoria.
        </p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {meals.map((meal: MealItem) => (
        <MealCard
          key={meal.idMeal}
          idMeal={meal.idMeal}
          mealThumb={meal.strMealThumb}
          strMeal={meal.strMeal}
        />
      ))}
    </section>
  );
};
